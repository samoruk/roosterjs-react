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
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var React = require("react");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var Styles = require("./emoji.scss.g");
var EmojiIcon = /** @class */ (function (_super) {
    __extends(EmojiIcon, _super);
    function EmojiIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiIcon.prototype.render = function () {
        var _a;
        var _b = this.props, emoji = _b.emoji, onClick = _b.onClick, isSelected = _b.isSelected, onMouseOver = _b.onMouseOver, onFocus = _b.onFocus, strings = _b.strings, id = _b.id, className = _b.className, selectedClassName = _b.selectedClassName;
        var content = strings[emoji.description];
        return (React.createElement("button", __assign({ id: id, role: "option", className: Utilities_1.css(Styles.emoji, className, (_a = { "rooster-emoji-selected": isSelected }, _a[selectedClassName] = isSelected, _a)), onClick: onClick, onMouseOver: onMouseOver, onFocus: onFocus, "data-is-focusable": true, "aria-label": content, "aria-selected": isSelected }, roosterjs_react_common_1.getDataAndAriaProps(this.props)), emoji.codePoint || "…"));
    };
    return EmojiIcon;
}(React.Component));
exports.default = EmojiIcon;
//# sourceMappingURL=EmojiIcon.js.map