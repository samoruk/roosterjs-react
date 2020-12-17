"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentChangedPlugin = /** @class */ (function () {
    function ContentChangedPlugin(onChange) {
        var _this = this;
        this.onChange = onChange;
        this.onChangeEvent = function () {
            _this.onChange(_this.editor.getContent());
        };
    }
    ContentChangedPlugin.prototype.getName = function () {
        return 'ContentChanged';
    };
    ContentChangedPlugin.prototype.initialize = function (editor) {
        this.editor = editor;
        this.changeDisposer = this.editor.addDomEventHandler("input", this.onChangeEvent);
        this.textInputDisposer = this.editor.addDomEventHandler("textinput", this.onChangeEvent); // IE 11
        this.pasteDisposer = this.editor.addDomEventHandler("paste", this.onChangeEvent);
    };
    ContentChangedPlugin.prototype.onPluginEvent = function (event) {
        if (event && event.eventType === 6 /* ContentChanged */) {
            this.onChangeEvent();
        }
    };
    ContentChangedPlugin.prototype.dispose = function () {
        if (this.changeDisposer) {
            this.changeDisposer();
            this.changeDisposer = null;
        }
        if (this.textInputDisposer) {
            this.textInputDisposer();
            this.textInputDisposer = null;
        }
        if (this.pasteDisposer) {
            this.pasteDisposer();
            this.pasteDisposer = null;
        }
        this.editor = null;
    };
    return ContentChangedPlugin;
}());
exports.default = ContentChangedPlugin;
//# sourceMappingURL=ContentChangedPlugin.js.map