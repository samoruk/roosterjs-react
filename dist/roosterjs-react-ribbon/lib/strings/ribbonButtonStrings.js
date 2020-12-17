"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getString = exports.ribbonButtonStrings = void 0;
var roosterjs_react_common_1 = require("roosterjs-react-common");
var STRING_CATEGORY = 'ROOSTERJS_STRINGS_RIBBON';
exports.ribbonButtonStrings = {
    // Ribbon buttons
    btnMore: 'More formatting options',
    btnFontName: 'Font',
    btnFontSize: 'Font size',
    btnBold: 'Bold',
    btnItalic: 'Italic',
    btnUnderline: 'Underline',
    btnBullets: 'Bullets',
    btnNumbering: 'Numbering',
    btnIndent: 'Increase indent',
    btnOutdent: 'Decrease indent',
    btnQuote: 'Quote',
    btnAlignLeft: 'Align left',
    btnAlignCenter: 'Align center',
    btnAlignRight: 'Align right',
    btnUnlink: 'Remove hyperlink',
    btnSubscript: 'Subscript',
    btnSuperScript: 'Superscript',
    btnStrikethrough: 'Strikethrough',
    btnLTR: 'Left-to-right',
    btnRTL: 'Right-to-left',
    btnUndo: 'Undo',
    btnRedo: 'Redo',
    btnUnformat: 'Remove formatting',
    btnBkColor: 'Highlight',
    btnFontColor: 'Font color',
    btnInsertLink: 'Insert hyperlink',
    btnImageAltText: 'Insert alternate text',
    dlgLinkTitle: 'Insert link',
    dlgUrlLabel: 'URL: ',
    dlgAltTextTitle: 'Insert alternate text',
};
roosterjs_react_common_1.registerDefaultString(STRING_CATEGORY, exports.ribbonButtonStrings);
function getString(name, strings) {
    return roosterjs_react_common_1.getString(STRING_CATEGORY, name, strings);
}
exports.getString = getString;
//# sourceMappingURL=ribbonButtonStrings.js.map