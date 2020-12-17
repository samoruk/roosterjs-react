"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNonCompatIndentation = exports.toggleNonCompatBullet = exports.toggleNonCompatNumbering = void 0;
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
function execCommand(editor, command, addUndoSnapshotWhenCollapsed) {
    editor.focus();
    var formatter = function () { return editor.getDocument().execCommand(command, false, null); };
    var range = editor.getSelectionRange();
    if (range && range.collapsed && !addUndoSnapshotWhenCollapsed) {
        formatter();
    }
    else {
        editor.addUndoSnapshot(formatter);
    }
}
/**
 * Toggle numbering at selection
 * If selection contains numbering in deep level, toggle numbering will decrease the numbering level by one
 * If selection contains bullet list, toggle numbering will convert the bullet list into number list
 * If selection contains both bullet/numbering and normal text, the behavior is decided by corresponding
 * realization of browser execCommand API
 * @param editor The editor instance
 */
function toggleNonCompatNumbering(editor) {
    execCommand(editor, "insertOrderedList" /* InsertOrderedList */, true);
}
exports.toggleNonCompatNumbering = toggleNonCompatNumbering;
/**
 * Toggle bullet at selection
 * If selection contains bullet in deep level, toggle bullet will decrease the bullet level by one
 * If selection contains number list, toggle bullet will convert the number list into bullet list
 * If selection contains both bullet/numbering and normal text, the behavior is decided by corresponding
 * browser execCommand API
 * @param editor The editor instance
 */
function toggleNonCompatBullet(editor) {
    execCommand(editor, "insertUnorderedList" /* InsertUnorderedList */, true);
}
exports.toggleNonCompatBullet = toggleNonCompatBullet;
/**
 * Set indentation at selection
 * If selection contains bullet/numbering list, increase/decrease indentation will
 * increase/decrease the list level by one.
 * @param editor The editor instance
 * @param indentation The indentation option:
 * Indentation.Increase to increase indentation or Indentation.Decrease to decrease indentation
 */
function setNonCompatIndentation(editor, indentation) {
    editor.focus();
    var command = indentation == 0 /* Increase */ ? 'indent' : 'outdent';
    editor.addUndoSnapshot(function () {
        var format = roosterjs_editor_api_1.getFormatState(editor);
        editor.getDocument().execCommand(command, false, null);
        if (!format.isBullet && !format.isNumbering) {
            editor.queryElements('blockquote', 1 /* OnSelection */, function (node) {
                node.style.marginTop = '0';
                node.style.marginBottom = '0';
            });
        }
    });
}
exports.setNonCompatIndentation = setNonCompatIndentation;
//# sourceMappingURL=NonCompatFormatter.js.map