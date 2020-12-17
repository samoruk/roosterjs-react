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
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var Styles = require("./Picker.scss.g");
var FONTSIZE_REGEX = /(\d+)pt/i;
// This list is used to populate font size picker drop down
var FONT_SIZE_LIST = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '18',
    '20',
    '22',
    '24',
    '26',
    '28',
    '36',
    '48',
    '72',
];
var FontSizePicker = /** @class */ (function (_super) {
    __extends(FontSizePicker, _super);
    function FontSizePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FontSizePicker.prototype.createMenuItems = function (selectedSize) {
        var _this = this;
        return FONT_SIZE_LIST.map(function (size) {
            return {
                key: size,
                name: size,
                data: size,
                checked: selectedSize == size,
                canCheck: true,
                onClick: function () {
                    _this.props.onDismissMenu();
                    _this.props.onSelectSize(size);
                },
            };
        });
    };
    FontSizePicker.prototype.render = function () {
        var _a = this.props, onDismissMenu = _a.onDismissMenu, menuTargetElement = _a.menuTargetElement, selectedSize = _a.selectedSize;
        var matches = (selectedSize || '').match(FONTSIZE_REGEX);
        selectedSize = matches && matches.length == 2 ? matches[1] : selectedSize;
        return (React.createElement(ContextualMenu_1.ContextualMenu, { className: Styles.ribbonFontSizePicker, shouldFocusOnMount: true, target: menuTargetElement, directionalHint: ContextualMenu_1.DirectionalHint.bottomLeftEdge, onDismiss: onDismissMenu, items: this.createMenuItems(selectedSize) }));
    };
    return FontSizePicker;
}(React.Component));
exports.default = FontSizePicker;
//# sourceMappingURL=FontSizePicker.js.map