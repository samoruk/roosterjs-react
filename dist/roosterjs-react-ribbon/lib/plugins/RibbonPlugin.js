"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RibbonPlugin = /** @class */ (function () {
    function RibbonPlugin(onButtonClick) {
        this.onButtonClick = onButtonClick;
        this.ribbons = [];
    }
    RibbonPlugin.prototype.getName = function () {
        return 'Ribbon';
    };
    RibbonPlugin.prototype.initialize = function (editor) {
        this.editor = editor;
    };
    RibbonPlugin.prototype.dispose = function () {
        this.editor = null;
    };
    RibbonPlugin.prototype.onPluginEvent = function (event) {
        if (event.eventType == 2 /* KeyUp */ ||
            event.eventType == 5 /* MouseUp */ ||
            event.eventType == 6 /* ContentChanged */) {
            this.ribbons.forEach(function (ribbon) { return ribbon.onFormatChange(); });
        }
    };
    RibbonPlugin.prototype.getEditor = function () {
        return this.editor;
    };
    RibbonPlugin.prototype.buttonClick = function (buttonName) {
        if (this.onButtonClick) {
            this.onButtonClick(buttonName);
        }
    };
    RibbonPlugin.prototype.registerRibbonComponent = function (ribbon) {
        if (this.ribbons.indexOf(ribbon) < 0) {
            this.ribbons.push(ribbon);
        }
    };
    RibbonPlugin.prototype.unregisterRibbonComponent = function (ribbon) {
        var index = this.ribbons.indexOf(ribbon);
        if (index >= 0) {
            this.ribbons.splice(index, 1);
        }
    };
    RibbonPlugin.prototype.resize = function () {
        this.ribbons.forEach(function (ribbon) { return ribbon.onResize(); });
    };
    return RibbonPlugin;
}());
exports.default = RibbonPlugin;
//# sourceMappingURL=RibbonPlugin.js.map