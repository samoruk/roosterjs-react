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
require("./RoosterCommandBar.scss.g");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var React = require("react");
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var roosterjs_react_editor_1 = require("roosterjs-react-editor");
var getIconOnRenderDelegate_1 = require("../utils/getIconOnRenderDelegate");
var OutOfBoxCommandBarButtons_1 = require("../utils/OutOfBoxCommandBarButtons");
var DisplayNoneStyle = { display: "none" };
var RoosterCommandBar = /** @class */ (function (_super) {
    __extends(RoosterCommandBar, _super);
    function RoosterCommandBar(props) {
        var _this = _super.call(this, props) || this;
        _this._id = RoosterCommandBar.IdCounter++;
        _this._fileInputOnRef = function (ref) {
            _this._fileInput = ref;
        };
        _this._fileInputOnChange = function () {
            var _a = _this.props, roosterCommandBarPlugin = _a.roosterCommandBarPlugin, imageManager = _a.imageManager;
            var editor = roosterCommandBarPlugin.getEditor();
            var file = _this._fileInput.files[0];
            if (editor && !editor.isDisposed() && file) {
                if (imageManager) {
                    var placeholder = imageManager.upload(editor, file);
                    editor.insertNode(placeholder);
                    editor.triggerContentChangedEvent("Format" /* Format */);
                    editor.addUndoSnapshot();
                }
                else {
                    roosterjs_editor_api_1.insertImage(editor, file);
                }
                _this._fileInput.value = "";
            }
        };
        _this._refreshButtonStatesCore = function (commandBarButton, firstLevel) {
            if (!commandBarButton) {
                return null;
            }
            var formatState = _this.state.formatState;
            if (commandBarButton.getChecked) {
                var checked = commandBarButton.getChecked(formatState);
                commandBarButton.checked = checked;
                if (!commandBarButton.isContextMenuItem) {
                    commandBarButton[roosterjs_react_common_1.AriaAttributes.Pressed] = checked; // OF 5.0
                }
            }
            if (commandBarButton.getDisabled) {
                commandBarButton.disabled = commandBarButton.getDisabled(formatState);
            }
            if (commandBarButton.subMenuProps && commandBarButton.subMenuProps.items) {
                commandBarButton.subMenuProps.items.forEach(_this._refreshChildButtonStates);
            }
            return commandBarButton;
        };
        _this._refreshButtonStates = function (commandBarButton) {
            return _this._refreshButtonStatesCore(commandBarButton, true);
        };
        _this._refreshChildButtonStates = function (commandBarButton) {
            return _this._refreshButtonStatesCore(commandBarButton, false);
        };
        _this._createButton = function (commandBarButton, firstLevel) {
            if (firstLevel === void 0) { firstLevel = true; }
            if (!commandBarButton) {
                return null;
            }
            var _a = _this.props, strings = _a.strings, calloutClassName = _a.calloutClassName, calloutOnDismiss = _a.calloutOnDismiss, tooltipDirectionHint = _a.tooltipDirectionHint;
            var className = commandBarButton.className || "";
            var rootClassName = className.split(" ").indexOf(OutOfBoxCommandBarButtons_1.RoosterCommandBarButtonRootClassName) < 0 ? OutOfBoxCommandBarButtons_1.RoosterCommandBarButtonRootClassName : undefined;
            // make a copy of the OOB button template since we're changing its properties
            var button = __assign(__assign({}, commandBarButton), { className: Utilities_1.css(rootClassName, { "first-level": firstLevel }, className) });
            if (!button.onRender && button.onRenderOptions) {
                var _b = button.onRenderOptions.customCacheKey, customCacheKey = _b === void 0 ? "" + button.key + _this._id : _b;
                button.onRender = getIconOnRenderDelegate_1.getIconButtonOnRenderDelegate(__assign(__assign({}, button.onRenderOptions), { customCacheKey: customCacheKey, tooltipDirectionHint: tooltipDirectionHint }));
            }
            button.onClick = button.onClick || _this._onCommandBarButtonClick.bind(_this, button);
            button.iconOnly = true;
            if (button.iconProps) {
                var _c = button.iconProps.className, className_1 = _c === void 0 ? "" : _c;
                button.iconProps = __assign(__assign({}, button.iconProps), { className: className_1.split(" ").indexOf(OutOfBoxCommandBarButtons_1.RoosterCommandBarIconClassName) < 0 ? Utilities_1.css(OutOfBoxCommandBarButtons_1.RoosterCommandBarIconClassName, className_1) : className_1 });
            }
            if (strings && strings[button.key] != null) {
                button.name = strings[button.key];
                if (button.title) {
                    button.title = button.name; // for buttons like color which has title/tooltip
                }
            }
            if (button.subMenuProps && button.subMenuProps.items) {
                button.subMenuProps = __assign({}, button.subMenuProps); // make a copy of the OOB submenu properties since we're changing them
                button.subMenuProps.items = button.subMenuProps.items.map(_this._createChildButton);
                button.subMenuProps.calloutProps = { className: calloutClassName };
                button.subMenuProps.onDismiss = calloutOnDismiss;
            }
            // make sure the initial states are correct
            _this._refreshButtonStatesCore(button, firstLevel);
            return button;
        };
        _this._createChildButton = function (commandBarButton) {
            return _this._createButton(commandBarButton, false);
        };
        _this._onCommandBarButtonClick = function (button) {
            var _a = _this.props, roosterCommandBarPlugin = _a.roosterCommandBarPlugin, onButtonClicked = _a.onButtonClicked;
            var editor = roosterCommandBarPlugin.getEditor();
            if (editor && button.handleChange) {
                var outOfBoxItem = button;
                outOfBoxItem.handleChange(editor, _this.props, _this.state);
            }
            // special case insert image
            if (button.key === OutOfBoxCommandBarButtons_1.RoosterCommmandBarButtonKeys.InsertImage) {
                _this._fileInput.click();
            }
            _this._updateFormatState();
            onButtonClicked && onButtonClicked(button.key);
        };
        _this._updateFormatState = function () {
            var roosterCommandBarPlugin = _this.props.roosterCommandBarPlugin;
            var editor = roosterCommandBarPlugin.getEditor();
            var formatState = editor ? roosterjs_editor_api_1.getFormatState(editor) : null;
            if (formatState && _this._hasFormatStateChanged(formatState)) {
                _this.setState({ formatState: formatState });
            }
        };
        _this.state = { formatState: roosterjs_react_editor_1.createFormatState() };
        _this._initButtons(props);
        _this._async = new Utilities_1.Async();
        _this._updateFormatStateDebounced = _this._async.debounce(function () { return _this._updateFormatState(); }, 100);
        return _this;
    }
    RoosterCommandBar.prototype.render = function () {
        var _a = this.props, className = _a.className, calloutClassName = _a.calloutClassName, calloutOnDismiss = _a.calloutOnDismiss, overflowMenuProps = _a.overflowMenuProps, commandBarClassName = _a.commandBarClassName, ellipsisAriaLabel = _a.ellipsisAriaLabel;
        // with the newest changes on the editor, refresh the buttons (e.g. bold button being selected if text selected is bold and header being checked if used)
        this._buttons.forEach(this._refreshButtonStates);
        return (React.createElement("div", { className: Utilities_1.css("rooster-command-bar", className) },
            React.createElement(CommandBar_1.CommandBar, { className: Utilities_1.css("rooster-command-bar-base", commandBarClassName), items: this._buttons, overflowButtonProps: {
                    ariaLabel: ellipsisAriaLabel,
                    menuProps: __assign(__assign({}, overflowMenuProps), { 
                        // we set items as empty to satisfy the type checker & because otherwise the component
                        // throws an error about an unexpected `undefined` value on first render.
                        //
                        // We expect it to be overridden by the commandBar when rendering the button
                        // after measuring.
                        items: [], calloutProps: {
                            className: calloutClassName
                        }, onDismiss: calloutOnDismiss, className: Utilities_1.css("rooster-command-bar-overflow", overflowMenuProps && overflowMenuProps.className), focusZoneProps: { direction: FocusZone_1.FocusZoneDirection.horizontal } })
                } }),
            React.createElement("input", { type: "file", ref: this._fileInputOnRef, accept: "image/*", style: DisplayNoneStyle, onChange: this._fileInputOnChange })));
    };
    RoosterCommandBar.prototype.componentDidMount = function () {
        var roosterCommandBarPlugin = this.props.roosterCommandBarPlugin;
        roosterCommandBarPlugin.registerRoosterCommandBar(this);
    };
    RoosterCommandBar.prototype.componentWillUnmount = function () {
        var roosterCommandBarPlugin = this.props.roosterCommandBarPlugin;
        roosterCommandBarPlugin.unregisterRoosterCommandBar(this);
        if (this._async) {
            this._async.dispose();
            this._async = null;
        }
    };
    RoosterCommandBar.prototype.componentWillReceiveProps = function (nextProps, nextState) {
        if (nextProps.buttonOverrides !== this.props.buttonOverrides) {
            this._initButtons(nextProps);
        }
    };
    RoosterCommandBar.prototype.refreshFormatState = function () {
        this._updateFormatStateDebounced();
    };
    RoosterCommandBar.prototype._initButtons = function (props) {
        var _this = this;
        var _a = props.buttonOverrides, buttonOverrides = _a === void 0 ? [] : _a, emojiPlugin = props.emojiPlugin;
        var buttonMap = __assign({}, OutOfBoxCommandBarButtons_1.OutOfBoxCommandBarButtonMap);
        var visibleButtonKeys = OutOfBoxCommandBarButtons_1.OutOfBoxCommandBarButtons.map(function (item) { return item.key; });
        for (var _i = 0, buttonOverrides_1 = buttonOverrides; _i < buttonOverrides_1.length; _i++) {
            var button = buttonOverrides_1[_i];
            if (!button) {
                continue;
            }
            var currentButton = buttonMap[button.key];
            if (currentButton) {
                buttonMap[button.key] = __assign(__assign({}, currentButton), button);
                var currentSubMenuProps = currentButton.subMenuProps;
                var subMenuPropsOverride = button.subMenuPropsOverride;
                if (currentSubMenuProps && subMenuPropsOverride) {
                    buttonMap[button.key].subMenuProps = __assign(__assign(__assign({}, currentSubMenuProps), subMenuPropsOverride), { className: Utilities_1.css(currentSubMenuProps.className, subMenuPropsOverride.className) });
                }
            }
            else {
                buttonMap[button.key] = button;
            }
            if (visibleButtonKeys.indexOf(button.key) === -1) {
                visibleButtonKeys.push(button.key);
            }
        }
        if (!emojiPlugin) {
            var emojiIndex = visibleButtonKeys.indexOf(OutOfBoxCommandBarButtons_1.RoosterCommmandBarButtonKeys.Emoji);
            if (emojiIndex > -1) {
                visibleButtonKeys.splice(emojiIndex, 1);
            }
        }
        this._buttons = visibleButtonKeys.map(function (key) { return _this._createButton(buttonMap[key]); }).filter(function (b) { return !!b && !b.exclude; });
        this._buttons.sort(function (l, r) {
            if (l.order !== r.order) {
                var leftOrder = l.order == null ? Number.MAX_VALUE : l.order;
                var rightOrder = r.order == null ? Number.MAX_VALUE : r.order;
                return leftOrder - rightOrder;
            }
            return visibleButtonKeys.indexOf(l.key) - visibleButtonKeys.indexOf(r.key);
        });
    };
    RoosterCommandBar.prototype._hasFormatStateChanged = function (newState) {
        var formatState = this.state.formatState;
        for (var key in formatState) {
            if (formatState[key] !== newState[key]) {
                return true;
            }
        }
        return false;
    };
    RoosterCommandBar.IdCounter = 0;
    return RoosterCommandBar;
}(React.PureComponent));
exports.default = RoosterCommandBar;
//# sourceMappingURL=RoosterCommandBar.js.map