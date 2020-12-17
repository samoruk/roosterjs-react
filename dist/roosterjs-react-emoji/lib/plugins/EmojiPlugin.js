"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Callout_1 = require("office-ui-fabric-react/lib/Callout");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var React = require("react");
var ReactDOM = require("react-dom");
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var roosterjs_editor_core_1 = require("roosterjs-editor-core");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var EmojiPane_1 = require("../components/EmojiPane");
var emojiList_1 = require("../utils/emojiList");
var searchEmojis_1 = require("../utils/searchEmojis");
var EMOJI_SEARCH_DELAY = 300;
var INTERNAL_EMOJI_FONT_NAME = "EmojiFont";
var EMOJI_FONT_LIST = "'Apple Color Emoji','Segoe UI Emoji', NotoColorEmoji,'Segoe UI Symbol','Android Emoji',EmojiSymbols";
// Regex looks for an emoji right before the : to allow contextual search immediately following an emoji
// MATCHES: 0: 😃:r
//          1: 😃
//          2: :r
var EMOJI_BEFORE_COLON_REGEX = /([\u0023-\u0039][\u20e3]|[\ud800-\udbff][\udc00-\udfff]|[\u00a9-\u00ae]|[\u2122-\u3299])*([:;][^:]*)/;
var KEYCODE_COLON = 186;
var KEYCODE_COLON_FIREFOX = 59;
var EmojiPlugin = /** @class */ (function () {
    function EmojiPlugin(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        this._onModeChanged = function (newMode) {
            if (newMode !== 0 /* Quick */) {
                _this._removeAutoCompleteAriaAttributes(); // remove since we switched to a dialog
            }
        };
        this._paneRef = function (ref) {
            _this._pane = ref;
        };
        this._calloutRef = function (ref) {
            _this._callout = ref;
        };
        this._calloutOnDismissInternal = function (ev) {
            _this._setIsSuggesting(false);
            if (_this.options.calloutOnDismiss) {
                _this.options.calloutOnDismiss(ev);
            }
        };
        this._onSelectFromPane = function (emoji, wordBeforeCursor) {
            if (emoji === emojiList_1.MoreEmoji) {
                _this._pane.showFullPicker(wordBeforeCursor);
                return;
            }
            _this._insertEmoji(emoji, wordBeforeCursor);
        };
        this._async = new Utilities_1.Async();
        this._refreshCalloutDebounced = this._async.debounce(function () { return _this._refreshCallout(); }, 100);
        this._strings = options.strings;
    }
    EmojiPlugin.prototype.getName = function () {
        return 'Emoji';
    };
    EmojiPlugin.prototype.initialize = function (editor) {
        this._editor = editor;
        var document = editor.getDocument();
        this._contentDiv = document.createElement("div");
        document.body.appendChild(this._contentDiv);
    };
    EmojiPlugin.prototype.initializeContentEditable = function (contentEditable) {
        this._contentEditable = contentEditable;
    };
    EmojiPlugin.prototype.setStrings = function (strings) {
        this._strings = strings;
    };
    EmojiPlugin.prototype.dispose = function () {
        this._setIsSuggesting(false);
        if (this._contentDiv) {
            ReactDOM.unmountComponentAtNode(this._contentDiv);
            this._contentDiv.parentElement.removeChild(this._contentDiv);
            this._contentDiv = null;
        }
        this._editor = null;
        this._contentEditable = null;
        if (this._async) {
            this._async.dispose();
            this._async = null;
        }
    };
    EmojiPlugin.prototype.willHandleEventExclusively = function (event) {
        return this._isSuggesting && (event.eventType === 0 /* KeyDown */ || event.eventType === 2 /* KeyUp */ || event.eventType === 5 /* MouseUp */);
    };
    EmojiPlugin.prototype.onPluginEvent = function (event) {
        var domEvent = event;
        var keyboardEvent = domEvent.rawEvent;
        if (event.eventType === 0 /* KeyDown */) {
            this._eventHandledOnKeyDown = false;
            if (this._isSuggesting) {
                this._onKeyDownSuggestingDomEvent(domEvent);
            }
            else if (keyboardEvent.which === Utilities_1.KeyCodes.backspace && this._canUndoEmoji) {
                // If KeyDown is backspace and canUndoEmoji, call editor undo
                this._editor.undo();
                this._handleEventOnKeyDown(domEvent);
                this._canUndoEmoji = false;
            }
        }
        else if (event.eventType === 2 /* KeyUp */ && !this._isModifierKey(keyboardEvent.key)) {
            if (this._isSuggesting) {
                this._onKeyUpSuggestingDomEvent(domEvent);
            }
            else {
                this._onKeyUpDomEvent(domEvent);
            }
        }
        else if (event.eventType === 5 /* MouseUp */) {
            // If MouseUp, the emoji cannot be undone
            this._canUndoEmoji = false;
            this._setIsSuggesting(false);
        }
    };
    EmojiPlugin.prototype.startEmoji = function (startingString) {
        if (startingString === void 0) { startingString = ":"; }
        var editor = this._editor;
        if (!editor) {
            return;
        }
        this._setIsSuggesting(true);
        editor.insertContent(startingString);
        this._triggerChangeEvent();
    };
    EmojiPlugin.prototype._setIsSuggesting = function (isSuggesting, restoreSavedRange) {
        var _this = this;
        if (restoreSavedRange === void 0) { restoreSavedRange = true; }
        if (this._isSuggesting === isSuggesting) {
            return;
        }
        this._isSuggesting = isSuggesting;
        if (this._isSuggesting) {
            ReactDOM.render(this._getCallout(), this._contentDiv);
            // we need to delay so NVDA will announce the first selection
            setTimeout(function () {
                var _contentEditable = _this._contentEditable;
                if (_contentEditable) {
                    _contentEditable.setAttribute(roosterjs_react_common_1.AriaAttributes.AutoComplete, "list");
                    _contentEditable.setAttribute(roosterjs_react_common_1.AriaAttributes.Owns, _this._pane.listId);
                    _contentEditable.setAttribute(roosterjs_react_common_1.AriaAttributes.ActiveDescendant, _this._pane.getEmojiElementIdByIndex(0));
                }
            }, 0);
            this._editor.saveSelectionRange();
        }
        else {
            ReactDOM.unmountComponentAtNode(this._contentDiv);
            this._removeAutoCompleteAriaAttributes();
            restoreSavedRange && this._editor.restoreSavedRange();
        }
    };
    EmojiPlugin.prototype._removeAutoCompleteAriaAttributes = function () {
        var _contentEditable = this._contentEditable;
        if (_contentEditable) {
            _contentEditable.removeAttribute(roosterjs_react_common_1.AriaAttributes.AutoComplete);
            _contentEditable.removeAttribute(roosterjs_react_common_1.AriaAttributes.Owns);
            _contentEditable.removeAttribute(roosterjs_react_common_1.AriaAttributes.ActiveDescendant);
        }
    };
    /**
     * On KeyDown suggesting DOM event
     * Try to insert emoji is possible
     * Intercept arrow keys to move selection if popup is shown
     */
    EmojiPlugin.prototype._onKeyDownSuggestingDomEvent = function (event) {
        // If key is enter, try insert emoji at selection
        // If key is space and selection is shortcut, try insert emoji
        var keyboardEvent = event.rawEvent;
        var selectedEmoji = this._pane.getSelectedEmoji();
        var wordBeforeCursor = this._getWordBeforeCursor(event);
        var emoji;
        switch (keyboardEvent.which) {
            case Utilities_1.KeyCodes.space:
                // We only want to insert on space if the word before the cursor is a shortcut
                emoji = wordBeforeCursor ? searchEmojis_1.matchShortcut(wordBeforeCursor) : null;
                if (!emoji) {
                    this._setIsSuggesting(false, false);
                }
                break;
            case Utilities_1.KeyCodes.enter:
                // check if selection is on the "..." and show full picker if so, otherwise try to apply emoji
                if (this._tryShowFullPicker(event, selectedEmoji, wordBeforeCursor)) {
                    break;
                }
                // We only want to insert on space if the word before the cursor is a shortcut
                // If the timer is not null, that means we have a search queued.
                // Check to see is the word before the cursor matches a shortcut first
                // Otherwise if the search completed and it is a shortcut, insert the first item
                emoji = this._timer ? searchEmojis_1.matchShortcut(wordBeforeCursor) : selectedEmoji;
                break;
            case Utilities_1.KeyCodes.left:
            case Utilities_1.KeyCodes.right:
                var nextIndex = this._pane.navigate(keyboardEvent.which === Utilities_1.KeyCodes.left ? -1 : 1);
                if (nextIndex >= 0) {
                    this._contentEditable.setAttribute(roosterjs_react_common_1.AriaAttributes.ActiveDescendant, this._pane.getEmojiElementIdByIndex(nextIndex));
                }
                this._handleEventOnKeyDown(event);
                break;
            case Utilities_1.KeyCodes.escape:
                this._setIsSuggesting(false);
                this._handleEventOnKeyDown(event);
        }
        if (emoji && (this._canUndoEmoji = this._insertEmoji(emoji, wordBeforeCursor))) {
            this._handleEventOnKeyDown(event);
        }
    };
    EmojiPlugin.prototype._tryShowFullPicker = function (event, selectedEmoji, wordBeforeCursor) {
        if (selectedEmoji !== emojiList_1.MoreEmoji) {
            return false;
        }
        this._handleEventOnKeyDown(event);
        this._pane.showFullPicker(wordBeforeCursor);
        return true;
    };
    /**
     * On KeyUp suggesting DOM event
     * If key is character, update search term
     * Otherwise set isSuggesting to false
     */
    EmojiPlugin.prototype._onKeyUpSuggestingDomEvent = function (event) {
        var _this = this;
        if (this._eventHandledOnKeyDown) {
            return;
        }
        var keyboardEvent = event.rawEvent;
        // If this is a character key or backspace
        // Clear the timer as we will either queue a new timer or stop suggesting
        if ((keyboardEvent.key.length === 1 && keyboardEvent.which !== Utilities_1.KeyCodes.space) || keyboardEvent.which === Utilities_1.KeyCodes.backspace) {
            window.clearTimeout(this._timer);
            this._timer = null;
        }
        var wordBeforeCursor = this._getWordBeforeCursor(event);
        if (wordBeforeCursor) {
            this._timer = window.setTimeout(function () {
                if (_this._pane) {
                    _this._pane.setSearch(wordBeforeCursor);
                    _this._timer = null;
                }
            }, EMOJI_SEARCH_DELAY);
        }
        else {
            this._setIsSuggesting(false);
        }
    };
    EmojiPlugin.prototype._onKeyUpDomEvent = function (event) {
        if (this._eventHandledOnKeyDown) {
            return;
        }
        var keyboardEvent = event.rawEvent;
        var wordBeforeCursor = this._getWordBeforeCursor(event);
        if ((keyboardEvent.which === KEYCODE_COLON || keyboardEvent.which === KEYCODE_COLON_FIREFOX) && wordBeforeCursor === ":") {
            var _a = this.options.onKeyboardTriggered, onKeyboardTriggered = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            this._setIsSuggesting(true);
            onKeyboardTriggered();
        }
        else if (wordBeforeCursor) {
            var cursorData = roosterjs_editor_core_1.cacheGetContentSearcher(event, this._editor);
            var charBeforeCursor = cursorData ? cursorData.getSubStringBefore(1) : null;
            // It is possible that the word before the cursor is ahead of the pluginEvent we are handling
            // ex. WordBeforeCursor is ":D"" but the event we are currently handling is for the : key
            // Check that the char before the cursor is actually the key event we are currently handling
            // Otherwise we set canUndoEmoji to early and user is unable to backspace undo on the inserted emoji
            if (keyboardEvent.key === charBeforeCursor) {
                var emoji = searchEmojis_1.matchShortcut(wordBeforeCursor);
                if (emoji && this._insertEmoji(emoji, wordBeforeCursor)) {
                    roosterjs_editor_core_1.clearContentSearcherCache(event);
                    this._canUndoEmoji = true;
                }
            }
        }
    };
    EmojiPlugin.prototype._insertEmoji = function (emoji, wordBeforeCursor) {
        var _this = this;
        var inserted = false;
        this._editor.addUndoSnapshot();
        var node = this._editor.getDocument().createElement("span");
        node.innerText = emoji.codePoint;
        if (wordBeforeCursor && roosterjs_editor_api_1.replaceWithNode(this._editor, wordBeforeCursor, node, false /*exactMatch*/)) {
            inserted = true;
            this._canUndoEmoji = true;
            // Update the editor cursor to be after the inserted node
            window.requestAnimationFrame(function () {
                if (_this._editor && _this._editor.contains(node)) {
                    _this._editor.select(node, -3 /* After */);
                    _this._editor.addUndoSnapshot();
                }
            });
        }
        else {
            inserted = this._editor.insertNode(node);
        }
        inserted && this._triggerChangeEvent();
        this._tryPatchEmojiFont();
        this._setIsSuggesting(false);
        return inserted;
    };
    EmojiPlugin.prototype._triggerChangeEvent = function () {
        this._editor.triggerContentChangedEvent("Emoji");
    };
    EmojiPlugin.prototype._isModifierKey = function (key) {
        return key === "Shift" || key === "Control" || key === "Alt" || key === "Command";
    };
    EmojiPlugin.prototype._handleEventOnKeyDown = function (event) {
        this._eventHandledOnKeyDown = true;
        event.rawEvent.preventDefault();
        event.rawEvent.stopImmediatePropagation();
    };
    EmojiPlugin.prototype._getCallout = function () {
        var _a = this.options, calloutClassName = _a.calloutClassName, _b = _a.emojiPaneProps, emojiPaneProps = _b === void 0 ? {} : _b;
        var cursorRect = this._editor.getCursorRect();
        var point = {
            x: cursorRect.left,
            y: (cursorRect.top + cursorRect.bottom) / 2
        };
        var gap = (cursorRect.bottom - cursorRect.top) / 2 + 5;
        return (React.createElement(Callout_1.Callout, { className: calloutClassName, target: point, directionalHint: Callout_1.DirectionalHint.bottomAutoEdge, isBeakVisible: false, gapSpace: gap, onDismiss: this._calloutOnDismissInternal, ref: this._calloutRef },
            React.createElement(EmojiPane_1.default, __assign({}, emojiPaneProps, { ref: this._paneRef, onSelect: this._onSelectFromPane, strings: this._strings || {}, onLayoutChanged: this._refreshCalloutDebounced, onModeChanged: this._onModeChanged, navBarProps: emojiPaneProps.navBarProps, statusBarProps: emojiPaneProps.statusBarProps, searchDisabled: !this._strings || emojiPaneProps.searchDisabled, hideStatusBar: !this._strings }))));
    };
    EmojiPlugin.prototype._refreshCallout = function () {
        this._callout.forceUpdate();
    };
    EmojiPlugin.prototype._tryPatchEmojiFont = function () {
        // This is not perfect way of doing this, but cannot find a better way.
        // Essentially what is happening is, emoji requires some special font to render properly. Without those font, it may render black and white
        // The fix we have right now is to find the topest block element and patch it with emoji font
        var range = this._editor.getSelectionRange();
        var inlineElement = range ? this._editor.getInlineElementAtNode(range.startContainer) : null;
        var blockElement = inlineElement ? inlineElement.getParentBlock() : null;
        if (blockElement) {
            var blockNode = blockElement.getStartNode();
            var fontFamily = blockNode.style.fontFamily;
            if (fontFamily && fontFamily.toLowerCase().indexOf("emoji") < 0) {
                blockNode.style.fontFamily = fontFamily + "," + INTERNAL_EMOJI_FONT_NAME + "," + EMOJI_FONT_LIST;
                return true;
            }
        }
        return false;
    };
    EmojiPlugin.prototype._getWordBeforeCursor = function (event) {
        var cursorData = roosterjs_editor_core_1.cacheGetContentSearcher(event, this._editor);
        var wordBeforeCursor = cursorData ? cursorData.getWordBefore() : null;
        var matches = EMOJI_BEFORE_COLON_REGEX.exec(wordBeforeCursor);
        return matches && matches.length > 2 && matches[0] === wordBeforeCursor ? matches[2] : null;
    };
    return EmojiPlugin;
}());
exports.default = EmojiPlugin;
//# sourceMappingURL=EmojiPlugin.js.map