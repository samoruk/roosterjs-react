"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roosterjs_html_sanitizer_1 = require("roosterjs-html-sanitizer");
function createEditorViewState(initialContent, options) {
    return {
        content: roosterjs_html_sanitizer_1.HtmlSanitizer.sanitizeHtml(initialContent, options) || '',
        isDirty: false
    };
}
exports.default = createEditorViewState;
//# sourceMappingURL=createEditorViewState.js.map