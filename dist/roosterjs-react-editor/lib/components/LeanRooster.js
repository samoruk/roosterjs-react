"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeanRoosterModes = void 0;
require("./LeanRooster.scss.g");
var React = require("react");
var roosterjs_editor_core_1 = require("roosterjs-editor-core");
var roosterjs_editor_dom_1 = require("roosterjs-editor-dom");
var roosterjs_editor_plugins_1 = require("roosterjs-editor-plugins");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var ContentEditableDivStyle = { userSelect: "text", msUserSelect: "text", WebkitUserSelect: "text" };
var ReadOnlyClassName = "readonly";
var LeanRoosterModes;
(function (LeanRoosterModes) {
    LeanRoosterModes[LeanRoosterModes["View"] = 0] = "View";
    LeanRoosterModes[LeanRoosterModes["Edit"] = 1] = "Edit";
})(LeanRoosterModes = exports.LeanRoosterModes || (exports.LeanRoosterModes = {}));
var LeanRooster = /** @class */ (function (_super) {
    __extends(LeanRooster, _super);
    function LeanRooster(props) {
        var _this = _super.call(this, props) || this;
        _this._mode = 0 /* View */;
        // Note: set React DIV up with an intial inner HTML, but don't change it after creating rooster editor, otherwise
        // React will recreate the elements defined by the inner HTML
        _this._initialContent = undefined;
        _this._editorOptions = null;
        _this._hasPlaceholder = false;
        _this._placeholderVisible = false;
        _this._refreshPlaceholder = function () {
            var isEmpty = _this.props.placeholder && _this.isEmpty();
            var wasPlaceholderVisible = _this._placeholderVisible;
            var hasFocus = _this._editor && _this._editor.hasFocus();
            _this._hasPlaceholder = isEmpty;
            _this._placeholderVisible = isEmpty && !hasFocus;
            // refresh if the placeholder's visibility was changed
            if (wasPlaceholderVisible !== _this._placeholderVisible) {
                _this.forceUpdate();
            }
        };
        _this._onHyperlinkClick = function (anchor, mouseEvent) {
            var _a = _this.props.onHyperlinkClick, onHyperlinkClick = _a === void 0 ? function (_) { return false; } : _a;
            return onHyperlinkClick(anchor, mouseEvent);
        };
        _this._hyperlinkToolTipCallback = function (href, anchor) {
            var _a = _this.props.hyperlinkToolTipCallback, hyperlinkToolTipCallback = _a === void 0 ? function (href, _) { return href; } : _a;
            return hyperlinkToolTipCallback(href, anchor);
        };
        _this._updateViewState = function (viewState, content, isInitializing) {
            if (viewState.content !== content) {
                viewState.content = content;
                if (!isInitializing) {
                    var originalContent = _this._initialContent ? _this._initialContent.__html : null;
                    viewState.isDirty = content !== originalContent;
                }
            }
        };
        _this._onMouseDown = function (ev) {
            var target = ev.target;
            var anchor = _this._getAnchorForClickOpenHyperlink(ev, target);
            if (anchor) {
                // we're going to handle click for the href, so don't switch to view mode
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            _this._placeholderVisible = false;
            var forceUpdate = true;
            _this._trySwithToEditMode(forceUpdate);
        };
        _this._onMouseUp = function (ev) {
            var target = ev.target;
            var anchor = _this._getAnchorForClickOpenHyperlink(ev, target);
            if (anchor) {
                var onHyperlinkClick = _this.props.onHyperlinkClick;
                // if editor has already activated, let the Hyperlink plugin call onHyperlinkClick
                if (_this.hasActivated && onHyperlinkClick) {
                    return;
                }
                // if no custom click handler or it returned false, open the link
                if (!onHyperlinkClick || onHyperlinkClick(anchor, ev.nativeEvent) === false) {
                    try {
                        window.open(anchor.getAttribute("href"), "_blank");
                    }
                    catch (_a) { }
                }
                return;
            }
            if (_this._editor && !_this._editor.hasFocus()) {
                _this._editor.focus();
            }
        };
        _this._onBlur = function (ev) {
            var _a = _this.props.onBlur, onBlur = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            _this._hasPlaceholder = false; // reset flag each time we blur
            var content = _this._updateContentToViewState();
            if (content !== null) {
                _this._refreshPlaceholder();
            }
            onBlur(ev);
        };
        _this._onDragEnter = function (ev) {
            var _a = _this.props.onDragEnter, onDragEnter = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            onDragEnter(ev);
        };
        _this._onDragLeave = function (ev) {
            var _a = _this.props.onDragLeave, onDragLeave = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            onDragLeave(ev);
        };
        _this._onDragOver = function (ev) {
            var _a = _this.props.onDragOver, onDragOver = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            onDragOver(ev);
        };
        _this._onFocus = function (ev) {
            var _a = _this.props.onFocus, onFocus = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            onFocus(ev);
        };
        // When used with FocusOutShell and CommandBar, React doesn't fire focus event when toggle
        // buttons with callout, so use the native event which is still triggered.
        _this._onFocusNative = function (ev) {
            var forceUpdate = false;
            if (_this._placeholderVisible) {
                _this._placeholderVisible = false;
                forceUpdate = true;
            }
            if (_this._trySwithToEditMode(forceUpdate)) {
                _this._editor.focus();
            }
        };
        _this._onDrop = function (ev) {
            var _a = _this.props.onDrop, onDrop = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            // handles the drop content scenario when editor is not yet activated and there's a placeholder
            if (_this._contentDiv) {
                _this.focus();
            }
            onDrop(ev);
        };
        _this._contentDivOnRef = function (ref) {
            var _a = _this.props, _b = _a.contentDivRef, contentDivRef = _b === void 0 ? roosterjs_react_common_1.NullFunction : _b, plugins = _a.plugins;
            var eventName = "focus";
            if (_this._contentDiv) {
                _this._contentDiv.removeEventListener(eventName, _this._onFocusNative);
            }
            if (ref) {
                ref.addEventListener(eventName, _this._onFocusNative);
            }
            _this._contentDiv = ref;
            plugins.forEach(function (p) { return p.initializeContentEditable && p.initializeContentEditable(ref); });
            contentDivRef(ref);
        };
        _this._setInitialReactContent(true);
        _this._editorOptions = _this._createEditorOptions();
        return _this;
    }
    LeanRooster.prototype.render = function () {
        var _a = this.props, isRtl = _a.isRtl, readonly = _a.readonly;
        return (
        // tslint:disable-next-line: react-no-dangerous-html
        React.createElement("div", __assign({}, roosterjs_react_common_1.getDataAndAriaProps(this.props), { className: this._getClassName(this.props), "data-placeholder": this.props.placeholder, contentEditable: !readonly, dir: this._getDirValue(isRtl), onBlur: this._onBlur, onFocus: this._onFocus, onMouseDown: this._onMouseDown, onMouseUp: this._onMouseUp, onDragEnter: this._onDragEnter, onDragLeave: this._onDragLeave, onDragOver: this._onDragOver, onDrop: this._onDrop, ref: this._contentDivOnRef, style: ContentEditableDivStyle, suppressContentEditableWarning: true, tabIndex: 0, dangerouslySetInnerHTML: this._initialContent, "aria-multiline": "true", role: "textbox" })));
    };
    LeanRooster.prototype.componentDidMount = function () {
        var _a = this.props, readonly = _a.readonly, activateRoosterOnMount = _a.activateRoosterOnMount, activateInViewMode = _a.activateInViewMode;
        if (!readonly && activateRoosterOnMount) {
            if (activateInViewMode) {
                this._editor = new roosterjs_editor_core_1.Editor(this._contentDiv, this._editorOptions);
                this._updateContentToViewState(true /* isInitializing */);
            }
            else {
                this._trySwithToEditMode();
            }
        }
        else if (!this._hasPlaceholder) {
            this._refreshPlaceholder();
        }
    };
    LeanRooster.prototype.componentWillUnmount = function () {
        this._updateContentToViewState();
        if (this._editor) {
            this._editor.dispose();
            this._editor = null;
        }
    };
    LeanRooster.prototype.componentWillReceiveProps = function (nextProps, nextState) {
        var div = this._contentDiv;
        if (!div) {
            return;
        }
        var className = nextProps.className, readonly = nextProps.readonly, isRtl = nextProps.isRtl, placeholder = nextProps.placeholder;
        if (className !== this.props.className) {
            div.setAttribute("class", this._getClassName(nextProps));
        }
        if (readonly !== this.props.readonly) {
            if (readonly) {
                div.classList.add(ReadOnlyClassName);
            }
            else {
                div.classList.remove(ReadOnlyClassName);
            }
            div.setAttribute("contentEditable", (!readonly).toString());
        }
        if (isRtl !== this.props.isRtl) {
            div.setAttribute("dir", this._getDirValue(isRtl));
        }
        if (placeholder !== this.props.placeholder) {
            div.setAttribute("data-placeholder", placeholder == null ? "" : placeholder);
        }
    };
    LeanRooster.prototype.shouldComponentUpdate = function () {
        return false;
    };
    Object.defineProperty(LeanRooster.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            if (value === 1 /* Edit */) {
                this._trySwithToEditMode();
            }
            else {
                this._trySwitchToViewMode();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LeanRooster.prototype, "hasActivated", {
        get: function () {
            return !!this._editor;
        },
        enumerable: false,
        configurable: true
    });
    LeanRooster.prototype.hasPlaceholder = function () {
        return this._hasPlaceholder;
    };
    LeanRooster.prototype.focus = function () {
        if (this._editor) {
            this._editor.focus();
        }
        else if (this._contentDiv) {
            this._contentDiv.focus();
        }
    };
    LeanRooster.prototype.reloadContent = function (triggerContentChangedEvent, resetUndo) {
        if (triggerContentChangedEvent === void 0) { triggerContentChangedEvent = true; }
        if (resetUndo === void 0) { resetUndo = true; }
        var viewState = this.props.viewState;
        if (this._editor) {
            this._editor.setContent(viewState.content, triggerContentChangedEvent);
            if (resetUndo && this._editorOptions.undo) {
                this._editorOptions.undo.clear();
                this._editor.addUndoSnapshot();
            }
            this._refreshPlaceholder();
        }
        else {
            this._setInitialReactContent();
            this.forceUpdate(this._refreshPlaceholder);
        }
    };
    LeanRooster.prototype.triggerContentChangedEvent = function (source) {
        this._editor && this._editor.triggerContentChangedEvent(source);
    };
    LeanRooster.prototype.selectAll = function () {
        var contentDiv = this._contentDiv;
        if (!contentDiv) {
            return;
        }
        if (this._editor && !this._editor.isDisposed()) {
            var range = this._editor.getDocument().createRange();
            range.selectNodeContents(contentDiv);
            this._editor.select(range);
        }
        else {
            var range = contentDiv.ownerDocument.createRange();
            range.selectNodeContents(contentDiv);
            var selection = window.getSelection();
            // Workaround IE exception 800a025e
            try {
                selection.removeAllRanges();
            }
            catch (e) { }
            selection.addRange(range);
        }
    };
    LeanRooster.prototype.isEmpty = function () {
        var _a = this.props, _b = _a.trimWithEmptyCheck, trimWithEmptyCheck = _b === void 0 ? false : _b, thresholdForIsEmptyCheck = _a.thresholdForIsEmptyCheck, viewState = _a.viewState, _c = _a.isEmptyFunction, isEmptyFunction = _c === void 0 ? roosterjs_editor_dom_1.isNodeEmpty : _c;
        if (!this._contentDiv) {
            return !viewState.content || viewState.content.length === 0;
        }
        if (thresholdForIsEmptyCheck && this._contentDiv.innerHTML.length >= thresholdForIsEmptyCheck) {
            return false;
        }
        return isEmptyFunction(this._contentDiv, trimWithEmptyCheck);
    };
    LeanRooster.prototype.getContent = function () {
        return this._editor ? this._editor.getContent() : this._contentDiv.innerHTML;
    };
    LeanRooster.prototype._getClassName = function (props) {
        var className = props.className, readonly = props.readonly;
        var modeClassName = this.mode === 0 /* View */ ? "view-mode" : "edit-mode";
        return roosterjs_react_common_1.css("lean-rooster", className, modeClassName, {
            readonly: readonly,
            "show-placeholder": this._placeholderVisible
        });
    };
    LeanRooster.prototype._getDirValue = function (isRtl) {
        return isRtl ? "rtl" : "ltr";
    };
    LeanRooster.prototype._setInitialReactContent = function (fromConstructor) {
        if (fromConstructor === void 0) { fromConstructor = false; }
        var viewState = this.props.viewState;
        var hasContent = viewState.content != null && viewState.content.length > 0;
        if (fromConstructor) {
            this._hasPlaceholder = this.props.placeholder && !hasContent;
            this._placeholderVisible = this._hasPlaceholder;
        }
        this._initialContent = hasContent ? { __html: viewState.content } : undefined;
    };
    LeanRooster.prototype._updateContentToViewState = function (isInitializing) {
        if (this._editor && !this._editor.isDisposed()) {
            var _a = this.props, _b = _a.updateViewState, updateViewState = _b === void 0 ? this._updateViewState : _b, viewState = _a.viewState;
            var content = this._editor.getContent();
            updateViewState(viewState, content, isInitializing);
            return content;
        }
        return null;
    };
    LeanRooster.prototype._createEditorOptions = function () {
        var _a = this.props, _b = _a.plugins, additionalPlugins = _b === void 0 ? [] : _b, _c = _a.undo, undo = _c === void 0 ? new roosterjs_editor_core_1.Undo() : _c, _d = _a.defaultFormat, defaultFormat = _d === void 0 ? {} : _d, contentEditFeatures = _a.contentEditFeatures, enableRestoreSelectionOnFocus = _a.enableRestoreSelectionOnFocus, coreApiOverride = _a.coreApiOverride, sanitizeAttributeCallbacks = _a.sanitizeAttributeCallbacks;
        var plugins = __spreadArrays([
            new roosterjs_editor_plugins_1.ContentEdit(__assign(__assign(__assign({}, roosterjs_editor_plugins_1.getDefaultContentEditFeatures()), { defaultShortcut: false, smartOrderedList: true }), contentEditFeatures)),
            new roosterjs_editor_plugins_1.HyperLink(this._hyperlinkToolTipCallback, undefined, this._onHyperlinkClick),
            new roosterjs_editor_plugins_1.Paste(null, __assign({ istemptitle: function (v) { return v; } }, sanitizeAttributeCallbacks))
        ], additionalPlugins);
        var disableRestoreSelectionOnFocus = !enableRestoreSelectionOnFocus;
        // Important: don't set the initial content, the content editable already starts with initial HTML content
        return { plugins: plugins, defaultFormat: defaultFormat, undo: undo, disableRestoreSelectionOnFocus: disableRestoreSelectionOnFocus, omitContentEditableAttributeChanges: true /* avoid unnecessary reflow */, coreApiOverride: coreApiOverride };
    };
    LeanRooster.prototype._trySwithToEditMode = function (alwaysForceUpdateForEditMode) {
        if (alwaysForceUpdateForEditMode === void 0) { alwaysForceUpdateForEditMode = false; }
        var _a = this.props, readonly = _a.readonly, _b = _a.onBeforeModeChange, onBeforeModeChange = _b === void 0 ? roosterjs_react_common_1.NullFunction : _b, _c = _a.onAfterModeChange, onAfterModeChange = _c === void 0 ? roosterjs_react_common_1.NullFunction : _c;
        if (readonly) {
            return false;
        }
        if (this.mode === 1 /* Edit */) {
            if (alwaysForceUpdateForEditMode) {
                this.forceUpdate();
            }
            return false;
        }
        if (onBeforeModeChange(1 /* Edit */)) {
            return;
        }
        var isInitializing = !this._editor;
        if (isInitializing) {
            this._editor = new roosterjs_editor_core_1.Editor(this._contentDiv, this._editorOptions);
        }
        this._mode = 1 /* Edit */;
        this._updateContentToViewState(isInitializing);
        this.forceUpdate();
        onAfterModeChange(1 /* Edit */);
        return true;
    };
    LeanRooster.prototype._trySwitchToViewMode = function () {
        var _a = this.props, _b = _a.onBeforeModeChange, onBeforeModeChange = _b === void 0 ? roosterjs_react_common_1.NullFunction : _b, _c = _a.onAfterModeChange, onAfterModeChange = _c === void 0 ? roosterjs_react_common_1.NullFunction : _c;
        if (this.mode === 0 /* View */) {
            return false;
        }
        if (onBeforeModeChange(0 /* View */)) {
            return false;
        }
        this._updateContentToViewState();
        this._mode = 0 /* View */;
        this.forceUpdate();
        onAfterModeChange(0 /* View */);
        return true;
    };
    LeanRooster.prototype._getAnchorForClickOpenHyperlink = function (ev, element) {
        var _a = this.props, clickOpenHyperlinkViewMode = _a.clickOpenHyperlinkViewMode, readonly = _a.readonly;
        var isPrimaryButton = ev.button === 0;
        if (!isPrimaryButton || !clickOpenHyperlinkViewMode || readonly || this.mode !== 0 /* View */) {
            return null;
        }
        // Hyperlink plugin will handle CTRL+Click when editor is created and FireFox will handle for contenteditable
        var ctrlOpen = roosterjs_editor_dom_1.Browser.isMac ? ev.metaKey : ev.ctrlKey;
        if ((this._editor && ctrlOpen) || (roosterjs_editor_dom_1.Browser.isFirefox && ctrlOpen)) {
            return null;
        }
        var anchor = roosterjs_editor_dom_1.findClosestElementAncestor(element, this._contentDiv, "a[href]");
        if (anchor) {
            return anchor;
        }
        return null;
    };
    return LeanRooster;
}(React.Component));
exports.default = LeanRooster;
//# sourceMappingURL=LeanRooster.js.map