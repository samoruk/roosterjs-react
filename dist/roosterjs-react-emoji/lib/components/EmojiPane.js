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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiPaneNavigateDirection = exports.EmojiPaneMode = void 0;
var Callout_1 = require("office-ui-fabric-react/lib/Callout");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var React = require("react");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var emojiList_1 = require("../utils/emojiList");
var searchEmojis_1 = require("../utils/searchEmojis");
var Styles = require("./emoji.scss.g");
var EmojiIcon_1 = require("./EmojiIcon");
var EmojiNavBar_1 = require("./EmojiNavBar");
var EmojiStatusBar_1 = require("./EmojiStatusBar");
// "When a div contains an element that is bigger (either taller or wider) than the parent and has the property
// overflow-x or overflow-y set to any value, then it can receive the focus."
// https://bugzilla.mozilla.org/show_bug.cgi?id=1069739
var TabIndexForFirefoxBug = -1;
var PaneBaseClassName = "rooster-emoji-pane";
var EmojisPerRow = 7;
var EmojiVisibleRowCount = 5;
var EmojiVisibleWithoutNavBarRowCount = 6;
var EmojiHeightPx = 40;
var VerticalDirectionKeys = [Utilities_1.KeyCodes.up, Utilities_1.KeyCodes.down];
var DirectionKeys = [Utilities_1.KeyCodes.left, Utilities_1.KeyCodes.right, Utilities_1.KeyCodes.up, Utilities_1.KeyCodes.down, Utilities_1.KeyCodes.home, Utilities_1.KeyCodes.end];
var TooltipCalloutProps = {
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 0,
    setInitialFocus: true,
    doNotLayer: false,
    directionalHint: Callout_1.DirectionalHint.bottomCenter
};
var EmojiPaneMode;
(function (EmojiPaneMode) {
    EmojiPaneMode[EmojiPaneMode["Quick"] = 0] = "Quick";
    EmojiPaneMode[EmojiPaneMode["Partial"] = 1] = "Partial";
    EmojiPaneMode[EmojiPaneMode["Full"] = 2] = "Full";
})(EmojiPaneMode = exports.EmojiPaneMode || (exports.EmojiPaneMode = {}));
var EmojiPaneNavigateDirection;
(function (EmojiPaneNavigateDirection) {
    EmojiPaneNavigateDirection[EmojiPaneNavigateDirection["Horizontal"] = 0] = "Horizontal";
    EmojiPaneNavigateDirection[EmojiPaneNavigateDirection["Vertical"] = 1] = "Vertical";
})(EmojiPaneNavigateDirection = exports.EmojiPaneNavigateDirection || (exports.EmojiPaneNavigateDirection = {}));
var EmojiPane = /** @class */ (function (_super) {
    __extends(EmojiPane, _super);
    function EmojiPane(props) {
        var _this = _super.call(this, props) || this;
        _this._baseId = EmojiPane.IdCounter++;
        _this._listId = "EmojiPane" + _this._baseId;
        _this._onSearchFocus = function (e) {
            _this._input = e.target;
        };
        _this._onSearchKeyPress = function (e) {
            if (!e || e.which !== Utilities_1.KeyCodes.enter) {
                return;
            }
            var _a = _this.state, index = _a.index, currentEmojiList = _a.currentEmojiList;
            if (index >= 0 && currentEmojiList && currentEmojiList.length > 0) {
                _this._onSelect(e, currentEmojiList[index]);
            }
        };
        _this._onSearchKeyDown = function (e) {
            if (!e || DirectionKeys.indexOf(e.which) < 0) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            var _emojiBody = _this._emojiBody;
            if (e.which === Utilities_1.KeyCodes.home) {
                _this.setState({ index: 0 });
                _emojiBody.scrollTop = 0;
                return;
            }
            if (e.which === Utilities_1.KeyCodes.end) {
                _this.setState({ index: _this.state.currentEmojiList.length - 1 });
                _emojiBody.scrollTop = _emojiBody.scrollHeight; // scrollHeight will be larger than max
                return;
            }
            var direction = VerticalDirectionKeys.indexOf(e.which) < 0 ? 0 /* Horizontal */ : 1 /* Vertical */;
            var newIndex = _this.navigate(e.which === Utilities_1.KeyCodes.left || e.which === Utilities_1.KeyCodes.up ? -1 : 1, direction);
            if (newIndex > -1) {
                var visibleRowCount = _this.state.mode === 2 /* Full */ ? EmojiVisibleRowCount : EmojiVisibleWithoutNavBarRowCount;
                var currentRow = Math.floor(newIndex / EmojisPerRow);
                var visibleTop = _emojiBody.scrollTop;
                var visibleBottom = visibleTop + visibleRowCount * EmojiHeightPx;
                var currentRowTop = currentRow * EmojiHeightPx;
                var currentRowBottom = currentRowTop + EmojiHeightPx;
                if (visibleTop <= currentRowTop && visibleBottom >= currentRowBottom) {
                    return; // row is visible, so exit
                }
                _emojiBody.scrollTop = currentRow * EmojiHeightPx;
            }
        };
        _this._onEmojiBodyRef = function (ref) {
            _this._emojiBody = ref;
        };
        _this._pivotClick = function (selected) {
            var currentFamily = selected;
            _this.setState({ currentEmojiList: emojiList_1.default[currentFamily], currentFamily: currentFamily });
        };
        _this._getTabId = function (itemKey) {
            return "family_" + itemKey + "_" + _this._baseId;
        };
        _this._searchRefCallback = function (ref) {
            _this._searchBox = ref;
            if (_this._searchBox) {
                _this._searchBox.focus();
                _this._searchBox.setSelectionStart(_this._searchBox.value.length);
            }
        };
        _this._focusZoneRefCallback = function (ref) {
            if (_this.props.searchDisabled && ref) {
                ref.focus();
            }
            if (_this._input) {
                // make sure to announce the active descending after the focus zone containing the emojis is ready
                _this._input.removeAttribute(roosterjs_react_common_1.AriaAttributes.ActiveDescendant);
                var emojiId_1 = _this._getEmojiIconId(_this.getSelectedEmoji());
                // we need to delay so NVDA will announce the first selection
                emojiId_1 && setTimeout(function () { return _this._input.setAttribute(roosterjs_react_common_1.AriaAttributes.ActiveDescendant, emojiId_1); }, 0);
            }
        };
        _this._onSearchChange = function (e, newValue) {
            var normalizedSearchValue = _this._normalizeSearchText(newValue, false);
            var newMode = normalizedSearchValue.length === 0 ? 2 /* Full */ : 1 /* Partial */;
            _this.setState({
                index: newMode === 2 /* Full */ ? -1 : 0,
                currentEmojiList: _this._getSearchResult(normalizedSearchValue, _this.state.mode),
                searchInBox: newValue,
                mode: newMode
            });
        };
        _this._onSelect = function (e, emoji) {
            e.stopPropagation();
            e.preventDefault();
            _this.props.onSelect && _this.props.onSelect(emoji, _this.state.search);
        };
        _this.state = {
            index: 0,
            mode: 0 /* Quick */,
            currentEmojiList: emojiList_1.CommonEmojis,
            currentFamily: "People" /* People */,
            search: ":",
            searchInBox: ""
        };
        return _this;
    }
    EmojiPane.prototype.render = function () {
        return this.state.mode === 0 /* Quick */ ? this._renderQuickPicker() : this._renderFullPicker();
    };
    EmojiPane.prototype.componentDidUpdate = function (_, prevState) {
        // call onLayoutChange when the call out parent of the EmojiPane needs to reorient itself on the page
        var _a = this.props, onLayoutChanged = _a.onLayoutChanged, onModeChanged = _a.onModeChanged;
        var _b = this.state, currentEmojiList = _b.currentEmojiList, mode = _b.mode, currentFamily = _b.currentFamily;
        if (mode !== prevState.mode) {
            onModeChanged(mode, prevState.mode);
            onLayoutChanged();
            return;
        }
        var currentEmojisLength = currentEmojiList ? currentEmojiList.length : emojiList_1.default[currentFamily].length;
        var prevEmojisLength = prevState.currentEmojiList ? prevState.currentEmojiList.length : emojiList_1.default[prevState.currentFamily].length;
        if (mode !== 0 /* Quick */ && currentEmojisLength !== prevEmojisLength) {
            onLayoutChanged();
            return;
        }
    };
    EmojiPane.prototype.navigate = function (change, direction) {
        if (direction === void 0) { direction = 0 /* Horizontal */; }
        var _a = this.state, index = _a.index, currentEmojiList = _a.currentEmojiList;
        if (direction === 1 /* Vertical */ && index !== -1) {
            change *= EmojisPerRow;
        }
        var newIndex = index + change;
        var length = currentEmojiList.length;
        if (newIndex >= 0 && newIndex < length) {
            this.setState({ index: newIndex });
            return newIndex;
        }
        return -1;
    };
    EmojiPane.prototype.getEmojiElementIdByIndex = function (index) {
        var currentEmojiList = this.state.currentEmojiList;
        var emoji = currentEmojiList[index];
        if (emoji) {
            return this._getEmojiIconId(emoji);
        }
        return null;
    };
    EmojiPane.prototype.getSelectedEmoji = function () {
        var _a = this.state, currentEmojiList = _a.currentEmojiList, index = _a.index;
        return currentEmojiList[index];
    };
    EmojiPane.prototype.showFullPicker = function (fullSearchText) {
        var normalizedSearchValue = this._normalizeSearchText(fullSearchText, true);
        var newMode = normalizedSearchValue.length === 0 ? 2 /* Full */ : 1 /* Partial */;
        this.setState({
            index: newMode === 2 /* Full */ ? -1 : 0,
            mode: newMode,
            currentEmojiList: this._getSearchResult(normalizedSearchValue, newMode),
            search: fullSearchText,
            searchInBox: normalizedSearchValue
        });
    };
    EmojiPane.prototype.setSearch = function (value) {
        var normalizedSearchValue = this._normalizeSearchText(value, false);
        this.setState({
            index: 0,
            currentEmojiList: this._getSearchResult(normalizedSearchValue, this.state.mode),
            search: value
        });
    };
    Object.defineProperty(EmojiPane.prototype, "listId", {
        get: function () {
            return this._listId;
        },
        enumerable: false,
        configurable: true
    });
    EmojiPane.prototype._normalizeSearchText = function (text, colonIncluded) {
        if (text == null) {
            return "";
        }
        if (colonIncluded) {
            text = text.substr(1);
        }
        return text.trim();
    };
    EmojiPane.prototype._getSearchResult = function (searchValue, mode) {
        var isQuickMode = mode === 0 /* Quick */;
        if (!searchValue) {
            return isQuickMode ? this.state.currentEmojiList : emojiList_1.default[this.state.currentFamily];
        }
        var emojiList = searchEmojis_1.searchEmojis(searchValue, this.props.strings);
        return isQuickMode ? emojiList.slice(0, 5).concat([emojiList_1.MoreEmoji]) : emojiList;
    };
    EmojiPane.prototype._renderQuickPicker = function () {
        var _a = this.props, quickPickerClassName = _a.quickPickerClassName, tooltipClassName = _a.tooltipClassName, strings = _a.strings;
        var selectedEmoji = this.getSelectedEmoji();
        var target = selectedEmoji ? "#" + this._getEmojiIconId(selectedEmoji) : undefined;
        var content = selectedEmoji ? strings[selectedEmoji.description] : undefined;
        // note: we're using a callout since TooltipHost does not support manual trigger, and we need to show the tooltip since quick picker is shown
        // as an autocomplete menu (false focus based on transferring navigation keyboard event)
        return (React.createElement("div", { id: this._listId, role: "listbox", className: roosterjs_react_common_1.css(Styles.quickPicker, PaneBaseClassName, "quick-picker", quickPickerClassName) },
            this._renderCurrentEmojiIcons(),
            React.createElement(Callout_1.Callout, __assign({}, TooltipCalloutProps, { role: "tooltip", target: target, hidden: !content, className: roosterjs_react_common_1.css(Styles.tooltip, tooltipClassName) }), content)));
    };
    EmojiPane.prototype._renderFullPicker = function () {
        var _a;
        var _b = this.props, fullPickerClassName = _b.fullPickerClassName, searchDisabled = _b.searchDisabled, searchPlaceholder = _b.searchPlaceholder, searchInputAriaLabel = _b.searchInputAriaLabel;
        var emojiId = this._getEmojiIconId(this.getSelectedEmoji());
        var autoCompleteAttributes = (_a = {},
            _a[roosterjs_react_common_1.AriaAttributes.AutoComplete] = "list",
            _a[roosterjs_react_common_1.AriaAttributes.Expanded] = "true",
            _a[roosterjs_react_common_1.AriaAttributes.HasPopup] = "listbox",
            _a[roosterjs_react_common_1.AriaAttributes.Owns] = this._listId,
            _a);
        if (emojiId) {
            autoCompleteAttributes[roosterjs_react_common_1.AriaAttributes.ActiveDescendant] = emojiId;
        }
        return (React.createElement("div", { className: roosterjs_react_common_1.css(PaneBaseClassName, fullPickerClassName) },
            !searchDisabled && (React.createElement(TextField_1.TextField, __assign({ role: "combobox", componentRef: this._searchRefCallback, value: this.state.searchInBox, onChange: this._onSearchChange, inputClassName: Styles.emojiTextInput, onKeyPress: this._onSearchKeyPress, onKeyDown: this._onSearchKeyDown, onFocus: this._onSearchFocus, placeholder: searchPlaceholder, ariaLabel: searchInputAriaLabel }, autoCompleteAttributes))),
            this.state.mode === 2 /* Full */ ? this._renderFullList() : this._renderPartialList()));
    };
    EmojiPane.prototype._renderCurrentEmojiIcons = function () {
        var _this = this;
        var _a = this.props, strings = _a.strings, emojiIconProps = _a.emojiIconProps;
        var currentEmojiList = this.state.currentEmojiList;
        return currentEmojiList.map(function (emoji, index) { return (React.createElement(EmojiIcon_1.default, __assign({ strings: strings }, emojiIconProps, { id: _this._getEmojiIconId(emoji), key: emoji.key, onMouseOver: function () { return _this.setState({ index: index }); }, onFocus: function () { return _this.setState({ index: index }); }, emoji: emoji, isSelected: index === _this.state.index, onClick: function (e) { return _this._onSelect(e, emoji); }, "aria-posinset": index + 1, "aria-setsize": currentEmojiList.length }))); });
    };
    EmojiPane.prototype._getEmojiIconId = function (emoji) {
        return emoji ? this._listId + "-" + emoji.key : undefined;
    };
    EmojiPane.prototype._renderPartialList = function () {
        var _a = this.props, partialListClassName = _a.partialListClassName, strings = _a.strings, hideStatusBar = _a.hideStatusBar, statusBarProps = _a.statusBarProps;
        var currentEmojiList = this.state.currentEmojiList;
        var hasResult = currentEmojiList && currentEmojiList.length > 0;
        return (React.createElement("div", null,
            React.createElement("div", { className: roosterjs_react_common_1.css(Styles.partialList, partialListClassName), "data-is-scrollable": true, tabIndex: TabIndexForFirefoxBug, ref: this._onEmojiBodyRef },
                React.createElement(FocusZone_1.FocusZone, { id: this._listId, role: "listbox", className: Styles.partialListContent, ref: this._focusZoneRefCallback }, this._renderCurrentEmojiIcons())),
            !hideStatusBar && React.createElement(EmojiStatusBar_1.default, __assign({ strings: strings }, statusBarProps, { hasResult: hasResult, emoji: this.getSelectedEmoji() }))));
    };
    EmojiPane.prototype._renderFullList = function () {
        var _a = this.props, fullListClassName = _a.fullListClassName, fullListContentClassName = _a.fullListContentClassName, strings = _a.strings, hideStatusBar = _a.hideStatusBar, navBarProps = _a.navBarProps, statusBarProps = _a.statusBarProps;
        var currentEmojiList = this.state.currentEmojiList;
        var hasResult = currentEmojiList && currentEmojiList.length > 0;
        return (React.createElement("div", { className: roosterjs_react_common_1.css(Styles.fullList, fullListClassName) },
            React.createElement("div", { className: Styles.fullListBody, "data-is-scrollable": true, tabIndex: TabIndexForFirefoxBug, ref: this._onEmojiBodyRef },
                React.createElement(EmojiNavBar_1.default, __assign({ strings: strings }, navBarProps, { onClick: this._pivotClick, currentSelected: this.state.currentFamily, getTabId: this._getTabId })),
                React.createElement("div", { className: Styles.fullListContentContainer, role: "tabpanel", "aria-labelledby": this._getTabId(this.state.currentFamily) },
                    React.createElement("div", null,
                        React.createElement(FocusZone_1.FocusZone, { id: this._listId, role: "listbox", className: roosterjs_react_common_1.css(Styles.fullListContent, fullListContentClassName), ref: this._focusZoneRefCallback }, this._renderCurrentEmojiIcons())))),
            !hideStatusBar && React.createElement(EmojiStatusBar_1.default, __assign({ strings: strings }, statusBarProps, { hasResult: hasResult, emoji: this.getSelectedEmoji() }))));
    };
    EmojiPane.IdCounter = 0;
    EmojiPane.defaultProps = { onLayoutChanged: roosterjs_react_common_1.NullFunction, onModeChanged: roosterjs_react_common_1.NullFunction };
    return EmojiPane;
}(React.PureComponent));
exports.default = EmojiPane;
//# sourceMappingURL=EmojiPane.js.map