"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageManager_1 = require("../utils/ImageManager");
var PlaceholderRegex = new RegExp("<img [^>]*" + ImageManager_1.PlaceholderDataAttribute + "=\"\\d+\"[^>]*>", "gm");
var PasteImagePlugin = /** @class */ (function () {
    function PasteImagePlugin(imageManager, preventImagePaste) {
        if (preventImagePaste === void 0) { preventImagePaste = false; }
        this.imageManager = imageManager;
        this.preventImagePaste = preventImagePaste;
    }
    PasteImagePlugin.prototype.getName = function () {
        return 'PasteImage';
    };
    PasteImagePlugin.prototype.initialize = function (editor) {
        this.editor = editor;
    };
    PasteImagePlugin.prototype.dispose = function () {
        if (this.editor) {
            this.editor = null;
        }
    };
    PasteImagePlugin.prototype.onPluginEvent = function (event) {
        if (event.eventType === 7 /* ExtractContent */) {
            var extractContentEvent = event;
            var content = extractContentEvent.content;
            var runRemove = ImageManager_1.hasPlaceholder(content);
            if (runRemove) {
                extractContentEvent.content = content.replace(PlaceholderRegex, "");
            }
            return;
        }
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
        if (this.preventImagePaste) {
            beforePasteEvent.pasteOption = 1 /* PasteText */;
            return;
        }
        var image = beforePasteEvent.clipboardData.image;
        var placeholder = this.imageManager.upload(editor, image, true);
        if (placeholder === null) {
            return;
        }
        // modify the pasting content and option so Paste plugin won't handle
        beforePasteEvent.fragment.appendChild(placeholder);
        beforePasteEvent.clipboardData.html = placeholder.outerHTML;
        beforePasteEvent.pasteOption = 0 /* PasteHtml */;
    };
    PasteImagePlugin.prototype.setPreventImagePaste = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        this.preventImagePaste = enabled;
    };
    PasteImagePlugin.prototype.getEditor = function () {
        return this.editor;
    };
    return PasteImagePlugin;
}());
exports.default = PasteImagePlugin;
//# sourceMappingURL=PasteImagePlugin.js.map