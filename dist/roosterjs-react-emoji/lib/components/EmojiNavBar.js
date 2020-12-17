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
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var Tooltip_1 = require("office-ui-fabric-react/lib/Tooltip");
var React = require("react");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var emojiList_1 = require("../utils/emojiList");
var EmojiNavBarStyles = require("./EmojiNavBar.scss.g");
var EmojiNavBar = /** @class */ (function (_super) {
    __extends(EmojiNavBar, _super);
    function EmojiNavBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiNavBar.prototype.render = function () {
        var _this = this;
        var _a = this.props, currentSelected = _a.currentSelected, getTabId = _a.getTabId, _b = _a.strings, strings = _b === void 0 ? {} : _b, className = _a.className, buttonClassName = _a.buttonClassName, selectedButtonClassName = _a.selectedButtonClassName, iconClassName = _a.iconClassName;
        var keys = Object.keys(emojiList_1.default);
        return (
        // for each emoji family key, create a button to use as nav bar
        React.createElement("div", { className: roosterjs_react_common_1.css(EmojiNavBarStyles.navBar, className), role: "tablist" },
            React.createElement(FocusZone_1.FocusZone, { direction: FocusZone_1.FocusZoneDirection.horizontal }, keys.map(function (key, index) {
                var _a;
                var selected = key === currentSelected;
                var friendlyName = strings[key];
                return (React.createElement(Tooltip_1.TooltipHost, { hostClassName: EmojiNavBarStyles.navBarTooltip, content: friendlyName, key: key },
                    React.createElement("button", { className: roosterjs_react_common_1.css(EmojiNavBarStyles.navBarButton, buttonClassName, "emoji-nav-bar-button", (_a = {},
                            _a[EmojiNavBarStyles.selected] = selected,
                            _a[selectedButtonClassName] = selected,
                            _a)), key: key, onClick: _this.onFamilyClick.bind(_this, key), id: getTabId(key), role: "tab", "aria-selected": selected, "aria-label": friendlyName, "data-is-focusable": "true", "aria-posinset": index + 1, "aria-setsize": keys.length },
                        React.createElement(Icon_1.Icon, { iconName: emojiList_1.EmojiFabricIconCharacterMap[key], className: iconClassName }))));
            }))));
    };
    EmojiNavBar.prototype.onFamilyClick = function (key) {
        if (this.props.onClick) {
            this.props.onClick(key);
        }
    };
    return EmojiNavBar;
}(React.Component));
exports.default = EmojiNavBar;
//# sourceMappingURL=EmojiNavBar.js.map