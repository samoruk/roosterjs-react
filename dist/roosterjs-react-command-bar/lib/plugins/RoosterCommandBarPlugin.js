"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertLinkStringKeys = void 0;
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var LinkDialog_1 = require("../components/LinkDialog");
var RoosterCommandBarPlugin_Shortcuts_1 = require("./RoosterCommandBarPlugin.Shortcuts");
exports.InsertLinkStringKeys = {
    LinkFieldLabel: "linkFieldLabel",
    Title: "linkPromptTitle",
    InsertButton: "insertLinkText",
    CancelButton: "cancelLinkText"
};
var RoosterCommandBarPlugin = /** @class */ (function () {
    function RoosterCommandBarPlugin(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.commandBars = [];
    }
    RoosterCommandBarPlugin.prototype.getName = function () {
        return 'RoosterCommandBar';
    };
    RoosterCommandBarPlugin.prototype.initialize = function (editor) {
        this.editor = editor;
        if (!editor) {
            return;
        }
        var doc = this.editor.getDocument();
        if (!doc) {
            return;
        }
    };
    RoosterCommandBarPlugin.prototype.dispose = function () {
        var _this = this;
        if (this.dialogDismiss) {
            this.dialogDismiss();
            this.dialogDismiss = null;
        }
        if (this.editor) {
            this.editor = null;
        }
        if (this.commandBars.length > 0) {
            this.commandBars.forEach(function (_, i) { return (_this.commandBars[i] = undefined); });
            this.commandBars = [];
        }
    };
    RoosterCommandBarPlugin.prototype.onPluginEvent = function (event) {
        if (this.commandBars && RoosterCommandBarPlugin.EventTypesToRefreshFormatState[event.eventType]) {
            this.commandBars.forEach(function (commandBar) { return commandBar.refreshFormatState(); });
            return;
        }
        if (event.eventType === 0 /* KeyDown */) {
            this.handleShortcuts(event);
        }
    };
    RoosterCommandBarPlugin.prototype.handleShortcuts = function (event) {
        var pluginDomEvent = event;
        var keyboardEvent = pluginDomEvent.rawEvent;
        if (keyboardEvent.defaultPrevented) {
            return;
        }
        var command = RoosterCommandBarPlugin_Shortcuts_1.getCommandFromEvent(event);
        if (command === "None" /* None */) {
            return;
        }
        var _a = this.options, disableListWorkaround = _a.disableListWorkaround, _b = _a.onShortcutTriggered, onShortcutTriggered = _b === void 0 ? roosterjs_react_common_1.NullFunction : _b;
        var editor = this.editor;
        var commandExecuted = true;
        switch (command) {
            case "Bold" /* Bold */:
                roosterjs_editor_api_1.toggleBold(editor);
                break;
            case "Italic" /* Italic */:
                roosterjs_editor_api_1.toggleItalic(editor);
                break;
            case "Underline" /* Underline */:
                roosterjs_editor_api_1.toggleUnderline(editor);
                break;
            case "Undo" /* Undo */:
                editor.undo();
                break;
            case "Redo" /* Redo */:
                editor.redo();
                break;
            case "Bullet" /* Bullet */:
                (disableListWorkaround ? roosterjs_react_common_1.toggleNonCompatBullet : roosterjs_editor_api_1.toggleBullet)(editor);
                break;
            case "Numbering" /* Numbering */:
                (disableListWorkaround ? roosterjs_react_common_1.toggleNonCompatNumbering : roosterjs_editor_api_1.toggleNumbering)(editor);
                break;
            case "InsertLink" /* InsertLink */:
                this.promptForLink();
                break;
            case "ClearFormat" /* ClearFormat */:
                this.clearFormat();
                break;
            default:
                commandExecuted = false;
        }
        if (commandExecuted) {
            onShortcutTriggered(command);
            keyboardEvent.preventDefault();
            keyboardEvent.stopPropagation();
        }
    };
    RoosterCommandBarPlugin.prototype.getEditor = function () {
        return this.editor;
    };
    RoosterCommandBarPlugin.prototype.registerRoosterCommandBar = function (commandBar) {
        if (this.commandBars.indexOf(commandBar) < 0) {
            this.commandBars.push(commandBar);
        }
    };
    RoosterCommandBarPlugin.prototype.unregisterRoosterCommandBar = function (commandBar) {
        var index = this.commandBars.indexOf(commandBar);
        if (index >= 0) {
            this.commandBars.splice(index, 1);
        }
    };
    RoosterCommandBarPlugin.prototype.promptForLink = function () {
        var _a = this.options, _b = _a.strings, strings = _b === void 0 ? {} : _b, onDismiss = _a.calloutOnDismiss, calloutClassName = _a.calloutClassName, className = _a.linkDialogClassName;
        this.dialogDismiss = LinkDialog_1.createLinkDialog(document, { editor: this.editor, strings: strings, onDismiss: onDismiss, className: className }, calloutClassName);
    };
    RoosterCommandBarPlugin.prototype.clearFormat = function () {
        var _this = this;
        var editor = this.editor;
        this.editor.addUndoSnapshot(function () {
            if (_this.options.useLegacyClearFormat) {
                roosterjs_editor_api_1.clearFormat(editor);
                roosterjs_editor_api_1.toggleHeader(editor, 0);
            }
            else {
                roosterjs_editor_api_1.clearBlockFormat(editor);
            }
        });
    };
    RoosterCommandBarPlugin.EventTypesToRefreshFormatState = (_a = {},
        _a[2 /* KeyUp */] = true,
        _a[4 /* MouseDown */] = true,
        _a[5 /* MouseUp */] = true,
        _a[6 /* ContentChanged */] = true,
        _a);
    return RoosterCommandBarPlugin;
}());
exports.default = RoosterCommandBarPlugin;
//# sourceMappingURL=RoosterCommandBarPlugin.js.map