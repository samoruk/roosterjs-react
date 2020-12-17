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
exports.blackColors = exports.textColors = void 0;
var React = require("react");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var colorStrings_1 = require("../strings/colorStrings");
var Styles = require("./Picker.scss.g");
exports.textColors = [
    { name: 'clrLightBlue', code: '#51a7f9' },
    { name: 'clrLightGreen', code: '#6fc040' },
    { name: 'clrLightYellow', code: '#f5d427' },
    { name: 'clrLightOrange', code: '#f3901d' },
    { name: 'clrLightRed', code: '#ed5c57' },
    { name: 'clrLightPurple', code: '#b36ae2' },
    { name: 'clrBlue', code: '#0c64c0' },
    { name: 'clrGreen', code: '#0c882a' },
    { name: 'clrYellow', code: '#dcbe22' },
    { name: 'clrOrange', code: '#de6a19' },
    { name: 'clrRed', code: '#c82613' },
    { name: 'clrPurple', code: '#763e9b' },
    { name: 'clrDarkBlue', code: '#174e86' },
    { name: 'clrDarkGreen', code: '#0f5c1a' },
    { name: 'clrDarkYellow', code: '#c3971d' },
    { name: 'clrDarkOrange', code: '#be5b17' },
    { name: 'clrDarkRed', code: '#861106' },
    { name: 'clrDarkPurple', code: '#5e327c' },
    { name: 'clrDarkerBlue', code: '#002451' },
    { name: 'clrDarkerGreen', code: '#06400c' },
    { name: 'clrDarkerYellow', code: '#a37519' },
    { name: 'clrDarkerOrange', code: '#934511' },
    { name: 'clrDarkerRed', code: '#570606' },
    { name: 'clrDarkerPurple', code: '#3b204d' },
    { name: 'clrWhite', code: '#ffffff', borderColor: '#bebebe' },
    { name: 'clrLightGray', code: '#cccccc' },
    { name: 'clrGray', code: '#999999' },
    { name: 'clrDarkGray', code: '#666666' },
    { name: 'clrDarkerGray', code: '#333333' },
    { name: 'clrBlack', code: '#000000' },
];
exports.blackColors = [
    { name: 'clrCyan', code: '#00ffff' },
    { name: 'clrGreen', code: '#00ff00' },
    { name: 'clrYellow', code: '#ffff00' },
    { name: 'clrOrange', code: '#ff8000' },
    { name: 'clrRed', code: '#ff0000' },
    { name: 'clrMagenta', code: '#ff00ff' },
    { name: 'clrLightCyan', code: '#80ffff' },
    { name: 'clrLightGreen', code: '#80ff80' },
    { name: 'clrLightYellow', code: '#ffff80' },
    { name: 'clrLightOrange', code: '#ffc080' },
    { name: 'clrLightRed', code: '#ff8080' },
    { name: 'clrLightMagenta', code: '#ff80ff' },
    { name: 'clrWhite', code: '#ffffff', borderColor: '#bebebe' },
    { name: 'clrLightGray', code: '#cccccc' },
    { name: 'clrGray', code: '#999999' },
    { name: 'clrDarkGray', code: '#666666' },
    { name: 'clrDarkerGray', code: '#333333' },
    { name: 'clrBlack', code: '#000000' },
];
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderColorMenuItem = function (item) {
            var color = item.data;
            var inlineStyles = { backgroundColor: color.code };
            var title = colorStrings_1.getString(color.name, _this.props.strings);
            if (color.borderColor) {
                inlineStyles.borderColor = color.borderColor;
            }
            return (React.createElement(Button_1.Button, { buttonType: Button_1.ButtonType.normal, "data-is-focusable": true, title: title, onClick: function () { return _this.onSelectColor(color); }, key: item.key },
                React.createElement("div", { className: Styles.ribbonColor, style: inlineStyles })));
        };
        _this.onSelectColor = function (color) {
            _this.props.onDismissMenu();
            _this.props.onSelectColor(color);
        };
        return _this;
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, onDismissMenu = _a.onDismissMenu, menuTargetElement = _a.menuTargetElement;
        var pickerStyle = Styles.ribbonColorPicker;
        return (React.createElement(ContextualMenu_1.ContextualMenu, { className: pickerStyle, target: menuTargetElement, directionalHint: ContextualMenu_1.DirectionalHint.bottomLeftEdge, onDismiss: onDismissMenu, focusZoneProps: {
                direction: FocusZone_1.FocusZoneDirection.bidirectional
            }, shouldFocusOnMount: true, items: this.props.colors.map(function (color) {
                return {
                    key: color.name,
                    name: color.name,
                    onRender: _this.renderColorMenuItem,
                    data: color,
                    className: Styles.ribbonColorItem,
                };
            }) }));
    };
    return ColorPicker;
}(React.Component));
exports.default = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map