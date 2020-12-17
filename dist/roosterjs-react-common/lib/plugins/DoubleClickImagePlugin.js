"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roosterjs_editor_dom_1 = require("roosterjs-editor-dom");
var DoubleClickImagePlugin = /** @class */ (function () {
    function DoubleClickImagePlugin(doubleClickImageSelector) {
        var _this = this;
        if (doubleClickImageSelector === void 0) { doubleClickImageSelector = 'img'; }
        this.doubleClickImageSelector = doubleClickImageSelector;
        this.onDoubleClick = function (ev) {
            var target = ev.target;
            if (roosterjs_editor_dom_1.getTagOfNode(target) !== 'IMG') {
                return;
            }
            var src = target.getAttribute('src');
            if (!src) {
                return;
            }
            var parent = target.parentNode;
            var elements = parent ? [].slice.call(parent.querySelectorAll(_this.doubleClickImageSelector)) : [];
            if (elements.indexOf(target) < 0) {
                return;
            }
            var isDataUrl = src.indexOf('data:') === 0;
            var openedWindow = window.open(isDataUrl ? null : src, '_blank');
            if (openedWindow) {
                // noopener
                openedWindow.opener = null;
                if (isDataUrl) {
                    // for data URL, we need to create an image otherwise we'll get
                    // Window is not allowed to navigate Top-frame navigations to data URLs
                    openedWindow.document.body.innerHTML = "<img src=\"" + src + "\">";
                }
            }
        };
    }
    DoubleClickImagePlugin.prototype.getName = function () {
        return 'DoubleClickImage';
    };
    DoubleClickImagePlugin.prototype.initialize = function (editor) {
        this.editor = editor;
        this.onDoubleClickDisposer = this.editor.addDomEventHandler('dblclick', this.onDoubleClick);
    };
    DoubleClickImagePlugin.prototype.dispose = function () {
        if (this.editor) {
            this.editor = null;
            this.onDoubleClickDisposer();
        }
    };
    DoubleClickImagePlugin.prototype.getEditor = function () {
        return this.editor;
    };
    return DoubleClickImagePlugin;
}());
exports.default = DoubleClickImagePlugin;
//# sourceMappingURL=DoubleClickImagePlugin.js.map