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
exports.getIconButtonOnRenderDelegate = exports.getIconOnRenderDelegateWithCustomCacheKey = exports.getIconOnRenderDelegate = void 0;
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Icon_1 = require("office-ui-fabric-react/lib/Icon");
var Tooltip_1 = require("office-ui-fabric-react/lib/Tooltip");
var React = require("react");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var OnRenderDelegateCache = {};
function getIconOnRenderDelegate(highContrastAssetName) {
    if (highContrastAssetName === void 0) { highContrastAssetName = null; }
    var assets = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        assets[_i - 1] = arguments[_i];
    }
    return getIconButtonOnRenderDelegate({ highContrastAssetName: highContrastAssetName, assets: assets });
}
exports.getIconOnRenderDelegate = getIconOnRenderDelegate;
function getIconOnRenderDelegateWithCustomCacheKey(customCacheKey, highContrastAssetName) {
    if (highContrastAssetName === void 0) { highContrastAssetName = null; }
    var assets = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        assets[_i - 2] = arguments[_i];
    }
    return getIconButtonOnRenderDelegate({ customCacheKey: customCacheKey, highContrastAssetName: highContrastAssetName, assets: assets });
}
exports.getIconOnRenderDelegateWithCustomCacheKey = getIconOnRenderDelegateWithCustomCacheKey;
function getIconButtonOnRenderDelegate(options) {
    var _a = options || {}, customCacheKey = _a.customCacheKey, assets = _a.assets, highContrastAssetName = _a.highContrastAssetName, tooltipDirectionHint = _a.tooltipDirectionHint;
    var cacheKey = customCacheKey != null ? customCacheKey : assets ? assets.map(function (a) { return a.name; }).join(".") : "";
    if (!OnRenderDelegateCache[cacheKey]) {
        var iconClassName_1 = "stacked-icon";
        var onRenderIcon_1 = undefined;
        if (assets && assets.length > 1) {
            onRenderIcon_1 = function () { return (React.createElement("div", { className: "stacked-icon-container" },
                assets.map(function (asset, i) { return (React.createElement(Icon_1.Icon, { key: i, iconName: asset.name, className: roosterjs_react_common_1.css(iconClassName_1, asset.className || iconClassName_1 + "-" + asset.name) })); }),
                highContrastAssetName && React.createElement(Icon_1.Icon, { iconName: highContrastAssetName, className: roosterjs_react_common_1.css(iconClassName_1, "high-contrast-icon") }))); };
        }
        var cmdButton_1 = null;
        OnRenderDelegateCache[cacheKey] = function (item) { return (React.createElement(Tooltip_1.TooltipHost, { hostClassName: "command-button-tool-tip", content: item.name, key: item.key, directionalHint: tooltipDirectionHint },
            React.createElement(Button_1.CommandBarButton, __assign({ componentRef: function (ref) { return (cmdButton_1 = ref); } }, item, { ariaLabel: item.name, menuProps: item.subMenuProps && __assign(__assign({}, item.subMenuProps), { onDismiss: function (ev) {
                        item.subMenuProps.onDismiss(ev);
                        cmdButton_1.dismissMenu();
                    } }), className: roosterjs_react_common_1.css("rooster-command-bar-button", item.buttonClassName), onRenderIcon: onRenderIcon_1 })))); };
    }
    return OnRenderDelegateCache[cacheKey];
}
exports.getIconButtonOnRenderDelegate = getIconButtonOnRenderDelegate;
//# sourceMappingURL=getIconOnRenderDelegate.js.map