"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontName = exports.fontSize = exports.imageAltText = exports.insertLink = exports.textColor = exports.backColor = exports.removeformat = exports.redo = exports.undo = exports.rtl = exports.ltr = exports.strikethrough = exports.superscript = exports.subscript = exports.unlink = exports.alignRight = exports.alignCenter = exports.alignLeft = exports.quote = exports.outdent = exports.indent = exports.numbering = exports.bullets = exports.underline = exports.italic = exports.bold = void 0;
var React = require("react");
var roosterjs_react_pickers_1 = require("roosterjs-react-pickers");
var ConfirmDialog_1 = require("./ConfirmDialog");
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var ribbonButtonStrings_1 = require("../strings/ribbonButtonStrings");
exports.bold = {
    name: 'btnBold',
    buttonState: function (formatState) {
        return formatState.isBold ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleBold(editor); },
};
exports.italic = {
    name: 'btnItalic',
    buttonState: function (formatState) {
        return formatState.isItalic ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleItalic(editor); },
};
exports.underline = {
    name: 'btnUnderline',
    buttonState: function (formatState) {
        return formatState.isUnderline ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleUnderline(editor); },
};
exports.bullets = {
    name: 'btnBullets',
    buttonState: function (formatState) {
        return formatState.isBullet ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleBullet(editor); },
};
exports.numbering = {
    name: 'btnNumbering',
    buttonState: function (formatState) {
        return formatState.isNumbering ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleNumbering(editor); },
};
exports.indent = {
    name: 'btnIndent',
    onClick: function (editor) { return roosterjs_editor_api_1.setIndentation(editor, 0 /* Increase */); },
};
exports.outdent = {
    name: 'btnOutdent',
    onClick: function (editor) { return roosterjs_editor_api_1.setIndentation(editor, 1 /* Decrease */); },
};
exports.quote = {
    name: 'btnQuote',
    onClick: function (editor) { return roosterjs_editor_api_1.toggleBlockQuote(editor); },
    buttonState: function (formatState) {
        return formatState.isBlockQuote ? 1 /* Checked */ : 0 /* Normal */;
    },
};
exports.alignLeft = {
    name: 'btnAlignLeft',
    onClick: function (editor) { return roosterjs_editor_api_1.setAlignment(editor, 0 /* Left */); },
};
exports.alignCenter = {
    name: 'btnAlignCenter',
    onClick: function (editor) { return roosterjs_editor_api_1.setAlignment(editor, 1 /* Center */); },
};
exports.alignRight = {
    name: 'btnAlignRight',
    onClick: function (editor) { return roosterjs_editor_api_1.setAlignment(editor, 2 /* Right */); },
};
exports.unlink = {
    name: 'btnUnlink',
    buttonState: function (formatState) {
        return formatState.canUnlink ? 0 /* Normal */ : 2 /* Disabled */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.removeLink(editor); },
};
exports.subscript = {
    name: 'btnSubscript',
    buttonState: function (formatState) {
        return formatState.isSubscript ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleSubscript(editor); },
};
exports.superscript = {
    name: 'btnSuperScript',
    buttonState: function (formatState) {
        return formatState.isSuperscript ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleSuperscript(editor); },
};
exports.strikethrough = {
    name: 'btnStrikethrough',
    buttonState: function (formatState) {
        return formatState.isStrikeThrough ? 1 /* Checked */ : 0 /* Normal */;
    },
    onClick: function (editor) { return roosterjs_editor_api_1.toggleStrikethrough(editor); },
};
exports.ltr = {
    name: 'btnLTR',
    onClick: function (editor) { return roosterjs_editor_api_1.setDirection(editor, 0 /* LeftToRight */); },
};
exports.rtl = {
    name: 'btnRTL',
    onClick: function (editor) { return roosterjs_editor_api_1.setDirection(editor, 1 /* RightToLeft */); },
};
exports.undo = {
    name: 'btnUndo',
    buttonState: function (formatState) {
        return formatState.canUndo ? 0 /* Normal */ : 2 /* Disabled */;
    },
    onClick: function (editor) { return editor.undo(); },
};
exports.redo = {
    name: 'btnRedo',
    buttonState: function (formatState) {
        return formatState.canRedo ? 0 /* Normal */ : 2 /* Disabled */;
    },
    onClick: function (editor) { return editor.redo(); },
};
exports.removeformat = {
    name: 'btnUnformat',
    onClick: function (editor) { return roosterjs_editor_api_1.clearFormat(editor); },
};
exports.backColor = {
    name: 'btnBkColor',
    dropdown: function (target, editor, dismiss, strings) { return (React.createElement(roosterjs_react_pickers_1.ColorPicker, { menuTargetElement: target, onDismissMenu: dismiss, colors: roosterjs_react_pickers_1.blackColors, strings: strings, onSelectColor: function (color) { return roosterjs_editor_api_1.setBackgroundColor(editor, color.code); } })); },
};
exports.textColor = {
    name: 'btnFontColor',
    dropdown: function (target, editor, dismiss, strings) { return (React.createElement(roosterjs_react_pickers_1.ColorPicker, { menuTargetElement: target, onDismissMenu: dismiss, colors: roosterjs_react_pickers_1.textColors, strings: strings, onSelectColor: function (color) { return roosterjs_editor_api_1.setTextColor(editor, color.code); } })); },
};
exports.insertLink = {
    name: 'btnInsertLink',
    onClick: function (editor, strings) {
        editor.saveSelectionRange();
        var link = '';
        try {
            link = editor.queryElements('a[href]', 1 /* OnSelection */)[0].href;
        }
        catch (e) { }
        ConfirmDialog_1.default(ribbonButtonStrings_1.getString('dlgLinkTitle', strings), ribbonButtonStrings_1.getString('dlgUrlLabel', strings), link, strings).then(function (link) {
            if (link) {
                editor.focus();
                roosterjs_editor_api_1.createLink(editor, link, link);
            }
        });
    },
};
exports.imageAltText = {
    name: 'btnImageAltText',
    buttonState: function (formatState) {
        return formatState.canAddImageAltText ? 0 /* Normal */ : 2 /* Disabled */;
    },
    onClick: function (editor, strings) {
        editor.saveSelectionRange();
        var node = editor.queryElements('img', 1 /* OnSelection */)[0];
        var alt = node.alt;
        ConfirmDialog_1.default(ribbonButtonStrings_1.getString('dlgAltTextTitle', strings), null, alt, strings).then(function (alt) {
            editor.focus();
            roosterjs_editor_api_1.setImageAltText(editor, alt);
        });
    },
};
exports.fontSize = {
    name: 'btnFontSize',
    dropdown: function (target, editor, dismiss, stringFormat, format) { return (React.createElement(roosterjs_react_pickers_1.FontSizePicker, { menuTargetElement: target, onDismissMenu: dismiss, onSelectSize: function (fontSize) { return roosterjs_editor_api_1.setFontSize(editor, fontSize + 'pt'); }, selectedSize: format.fontSize })); },
};
exports.fontName = {
    name: 'btnFontName',
    dropdown: function (target, editor, dismiss, strings, format) { return (React.createElement(roosterjs_react_pickers_1.FontNamePicker, { menuTargetElement: target, onDismissMenu: dismiss, onSelectName: function (font) { return roosterjs_editor_api_1.setFontName(editor, font.family); }, selectedName: format.fontName })); },
};
//# sourceMappingURL=buttons.js.map