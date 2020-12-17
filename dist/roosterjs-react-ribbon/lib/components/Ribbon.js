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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var roosterjs_react_editor_1 = require("roosterjs-react-editor");
var Callout_1 = require("office-ui-fabric-react/lib/Callout");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var ribbonButtonStrings_1 = require("../strings/ribbonButtonStrings");
var Buttons = require("./buttons");
var Styles = require("./Ribbon.scss.g");
var classNames = require('classnames');
var RIBBONSTATE_POLL_INTERVAL = 300;
var RIBBONITEM_WIDTH = 36;
var RIBBON_MARGIN = 12;
var BUTTONS = {
    bold: Buttons.bold,
    italic: Buttons.italic,
    underline: Buttons.underline,
    font: Buttons.fontName,
    size: Buttons.fontSize,
    bkcolor: Buttons.backColor,
    color: Buttons.textColor,
    bullet: Buttons.bullets,
    number: Buttons.numbering,
    indent: Buttons.indent,
    outdent: Buttons.outdent,
    quote: Buttons.quote,
    left: Buttons.alignLeft,
    center: Buttons.alignCenter,
    right: Buttons.alignRight,
    link: Buttons.insertLink,
    unlink: Buttons.unlink,
    sub: Buttons.subscript,
    super: Buttons.superscript,
    strike: Buttons.strikethrough,
    alttext: Buttons.imageAltText,
    ltr: Buttons.ltr,
    rtl: Buttons.rtl,
    undo: Buttons.undo,
    redo: Buttons.redo,
    unformat: Buttons.removeformat,
};
var Ribbon = /** @class */ (function (_super) {
    __extends(Ribbon, _super);
    function Ribbon(props) {
        var _this = _super.call(this, props) || this;
        _this.buttonElements = {};
        _this.moreButton = {
            name: 'btnMore',
            dropdown: function (targetElement) {
                return (React.createElement(Callout_1.Callout, { className: Styles.ribbonButtonMore, onDismiss: function () { return _this.setCurrentDropDown(null); }, gapSpace: 12, target: targetElement, isBeakVisible: false, setInitialFocus: false, directionalHint: Callout_1.DirectionalHint.topCenter }, _this.buttonNames
                    .slice(_this.state.visibleItemCount - 1, _this.buttonNames.length)
                    .map(function (name) { return _this.renderRibbonButton(name); })));
            },
        };
        _this.updateRibbonState = function () {
            _this.ribbonStateJobId = null;
            var editor = _this.props.ribbonPlugin.getEditor();
            var formatState = editor ? roosterjs_editor_api_1.getFormatState(editor) : null;
            if (formatState && _this.isFormatStateChanged(formatState)) {
                _this.setFormatState(formatState);
            }
        };
        _this.onDismiss = function () {
            _this.setCurrentDropDown(null);
        };
        _this.cancelEvent = function (e) {
            e.preventDefault();
        };
        _this.buttonNames = _this.props.buttonNames || Object.keys(BUTTONS);
        _this.state = {
            dropDown: null,
            formatState: roosterjs_react_editor_1.createFormatState(),
            visibleItemCount: _this.buttonNames.length,
        };
        return _this;
    }
    Ribbon.prototype.componentDidMount = function () {
        this.props.ribbonPlugin.registerRibbonComponent(this);
        this.onResize();
    };
    Ribbon.prototype.componentWillUnmount = function () {
        this.props.ribbonPlugin.unregisterRibbonComponent(this);
    };
    Ribbon.prototype.render = function () {
        var _this = this;
        var _a = this.state, visibleItemCount = _a.visibleItemCount, dropDown = _a.dropDown;
        var dropDownButton = dropDown && this.getButton(dropDown);
        var allButtons = this.buttonNames;
        var visibleButtons;
        var editor = this.props.ribbonPlugin.getEditor();
        if (visibleItemCount == allButtons.length) {
            // Show all buttons in ribbon
            visibleButtons = allButtons;
        }
        else {
            // Show (maxItems - 1) buttons + affordance, and move rest to overflowItems
            visibleButtons = allButtons.slice(0, visibleItemCount - 1);
            visibleButtons.push('more');
        }
        return (React.createElement("div", { ref: function (ref) { return (_this.ribbonContainer = ref); }, className: this.props.className },
            React.createElement(FocusZone_1.FocusZone, { className: Styles.ribbon, direction: FocusZone_1.FocusZoneDirection.horizontal },
                visibleButtons.map(function (name) { return _this.renderRibbonButton(name); }),
                dropDownButton &&
                    dropDownButton.dropdown &&
                    dropDownButton.dropdown(this.buttonElements[dropDown], editor, this.onDismiss, this.props.strings, this.state.formatState))));
    };
    Ribbon.prototype.onResize = function () {
        if (this.ribbonContainer) {
            var newWidth = this.ribbonContainer.clientWidth - RIBBON_MARGIN * 2;
            var minItemCount = this.getMinItemCount();
            var visibleItemCount = Math.min(Math.max(Math.floor(newWidth / RIBBONITEM_WIDTH), minItemCount), this.buttonNames.length);
            if (visibleItemCount != this.state.visibleItemCount) {
                this.setState({
                    dropDown: this.state.dropDown,
                    formatState: this.state.formatState,
                    visibleItemCount: visibleItemCount,
                });
            }
        }
    };
    Ribbon.prototype.onFormatChange = function () {
        if (this.ribbonStateJobId) {
            window.clearTimeout(this.ribbonStateJobId);
        }
        // if this.ribbonStateJobId is null, we need to schedule a job to pull state
        this.ribbonStateJobId = window.setTimeout(this.updateRibbonState, RIBBONSTATE_POLL_INTERVAL);
    };
    Ribbon.prototype.renderRibbonButton = function (name) {
        var _this = this;
        var ribbonButton = this.getButton(name);
        if (!ribbonButton) {
            throw new Error('Cannot find button by name: ' + name);
        }
        var buttonState = ribbonButton.buttonState
            ? ribbonButton.buttonState(this.state.formatState)
            : 0 /* Normal */;
        var isDisabled = buttonState == 2 /* Disabled */;
        var buttonClassName = classNames(Styles.ribbonIcon, (this.state.dropDown == name || buttonState == 1 /* Checked */) &&
            Styles.ribbonButtonChecked, isDisabled && Styles.ribbonButtonDisabled);
        var title = ribbonButtonStrings_1.getString(ribbonButton.name, this.props.strings);
        return (React.createElement("div", { className: Styles.ribbonButton, ref: function (ref) { return (_this.buttonElements[name] = ref); }, key: name },
            React.createElement(Button_1.IconButton, { className: buttonClassName, "data-is-focusable": true, title: title, onClick: !isDisabled && (function () { return _this.onRibbonButton(name); }), onDragStart: this.cancelEvent }, this.props.buttonRenderer ? (this.props.buttonRenderer(name, this.props.isRtl)) : (React.createElement("span", null, name)))));
    };
    Ribbon.prototype.setCurrentDropDown = function (name) {
        this.setState({
            dropDown: name,
            formatState: this.state.formatState,
            visibleItemCount: this.state.visibleItemCount,
        });
    };
    Ribbon.prototype.setFormatState = function (formatState) {
        this.setState({
            dropDown: this.state.dropDown,
            formatState: formatState,
            visibleItemCount: this.state.visibleItemCount,
        });
    };
    Ribbon.prototype.onRibbonButton = function (buttonName) {
        var button = this.getButton(buttonName);
        var plugin = this.props.ribbonPlugin;
        // Handle click event of the button
        if (button.dropdown) {
            // 1. If the button has a drop down, show the drop down
            this.setCurrentDropDown(this.state.dropDown == buttonName ? null : buttonName);
        }
        else if (button.onClick) {
            // 2. If the button has a customized onclick handler, invoke it
            var editor = plugin.getEditor();
            editor.focus();
            button.onClick(editor, this.props.strings);
            plugin.buttonClick(buttonName);
            this.updateRibbonState();
        }
    };
    Ribbon.prototype.getButton = function (buttonName) {
        if (buttonName == 'more') {
            return this.moreButton;
        }
        else {
            return BUTTONS[buttonName] || (this.props.additionalButtons || {})[buttonName];
        }
    };
    Ribbon.prototype.isFormatStateChanged = function (state) {
        var keys = Object.keys(this.state.formatState);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (this.state.formatState[key] != state[key]) {
                return true;
            }
        }
        return false;
    };
    Ribbon.prototype.getMinItemCount = function () {
        return this.props.minVisibleButtonCount > 0 ? this.props.minVisibleButtonCount : 8;
    };
    return Ribbon;
}(React.Component));
exports.default = Ribbon;
//# sourceMappingURL=Ribbon.js.map