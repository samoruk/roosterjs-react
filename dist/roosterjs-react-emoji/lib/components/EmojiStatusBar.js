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
var Tooltip_1 = require("office-ui-fabric-react/lib/Tooltip");
var React = require("react");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var StatusBarStyles = require("./EmojiStatusBar.scss.g");
var EmojiStatusBar = /** @class */ (function (_super) {
    __extends(EmojiStatusBar, _super);
    function EmojiStatusBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiStatusBar.prototype.render = function () {
        var _a = this.props, emoji = _a.emoji, strings = _a.strings, className = _a.className, hasResult = _a.hasResult;
        if (!hasResult) {
            var noResultDescription = strings["emjDNoSuggetions"];
            return (React.createElement("div", { className: roosterjs_react_common_1.css(StatusBarStyles.statusBar, className) },
                React.createElement("div", { style: { display: "none" }, "aria-live": "polite" }, noResultDescription),
                React.createElement("div", { className: StatusBarStyles.statusBarNoResultDetailsContainer },
                    React.createElement(Tooltip_1.TooltipHost, { content: noResultDescription, overflowMode: Tooltip_1.TooltipOverflowMode.Parent },
                        React.createElement("span", { role: "alert" }, noResultDescription)))));
        }
        var icon = emoji ? emoji.codePoint : "";
        var description = emoji ? strings[emoji.description] : "";
        return (React.createElement("div", { className: roosterjs_react_common_1.css(StatusBarStyles.statusBar, className) },
            React.createElement("i", { className: StatusBarStyles.statusBarIcon, role: "presentation", "aria-hidden": "true" }, icon),
            React.createElement("div", { className: StatusBarStyles.statusBarDetailsContainer },
                React.createElement("div", { className: StatusBarStyles.statusBarDetails },
                    React.createElement(Tooltip_1.TooltipHost, { content: description, overflowMode: Tooltip_1.TooltipOverflowMode.Parent }, description)))));
    };
    return EmojiStatusBar;
}(React.Component));
exports.default = EmojiStatusBar;
//# sourceMappingURL=EmojiStatusBar.js.map