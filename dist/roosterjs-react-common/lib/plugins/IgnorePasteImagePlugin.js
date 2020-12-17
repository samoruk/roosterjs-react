"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IgnorePasteImagePlugin = /** @class */ (function () {
    function IgnorePasteImagePlugin() {
    }
    Object.defineProperty(IgnorePasteImagePlugin, "Instance", {
        get: function () {
            return IgnorePasteImagePlugin.InternalInstance;
        },
        enumerable: false,
        configurable: true
    });
    IgnorePasteImagePlugin.prototype.getName = function () {
        return 'IgnorePasteImage';
    };
    IgnorePasteImagePlugin.prototype.initialize = function (editor) {
        this.editor = editor;
    };
    IgnorePasteImagePlugin.prototype.dispose = function () {
        if (this.editor) {
            this.editor = null;
        }
    };
    IgnorePasteImagePlugin.prototype.onPluginEvent = function (event) {
        if (event.eventType !== 9 /* BeforePaste */) {
            return;
        }
        var beforePasteEvent = event;
        if (beforePasteEvent.pasteOption !== 2 /* PasteImage */) {
            return;
        }
        // handle only before paste and image paste
        var editor = this.getEditor();
        if (!editor) {
            return;
        }
        // prevent pasting of image by telling the handler to interpret the paste as text
        beforePasteEvent.pasteOption = 1 /* PasteText */;
    };
    IgnorePasteImagePlugin.prototype.getEditor = function () {
        return this.editor;
    };
    IgnorePasteImagePlugin.InternalInstance = new IgnorePasteImagePlugin();
    return IgnorePasteImagePlugin;
}());
exports.default = IgnorePasteImagePlugin;
//# sourceMappingURL=IgnorePasteImagePlugin.js.map