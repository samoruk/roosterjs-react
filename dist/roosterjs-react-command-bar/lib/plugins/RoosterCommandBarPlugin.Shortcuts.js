"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandFromEvent = exports.RoosterShortcutCommands = void 0;
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var roosterjs_editor_dom_1 = require("roosterjs-editor-dom");
var RoosterShortcutCommands;
(function (RoosterShortcutCommands) {
    RoosterShortcutCommands["None"] = "None";
    RoosterShortcutCommands["Bold"] = "Bold";
    RoosterShortcutCommands["Italic"] = "Italic";
    RoosterShortcutCommands["Underline"] = "Underline";
    RoosterShortcutCommands["Undo"] = "Undo";
    RoosterShortcutCommands["Redo"] = "Redo";
    RoosterShortcutCommands["Bullet"] = "Bullet";
    RoosterShortcutCommands["Numbering"] = "Numbering";
    RoosterShortcutCommands["InsertLink"] = "InsertLink";
    RoosterShortcutCommands["ClearFormat"] = "ClearFormat";
})(RoosterShortcutCommands = exports.RoosterShortcutCommands || (exports.RoosterShortcutCommands = {}));
var macCommands = [
    // Bold for Mac: Command (Meta) + B
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.b,
        command: "Bold" /* Bold */
    },
    // Italic for Mac: Command (Meta) + I
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.i,
        command: "Italic" /* Italic */
    },
    // Underline for Mac: Command (Meta) + U
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.u,
        command: "Underline" /* Underline */
    },
    // Undo for Mac: Command (Meta) + Z
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.z,
        command: "Undo" /* Undo */
    },
    // Redo for Mac: Command (meta) + SHIFT + Z
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: true,
        which: Utilities_1.KeyCodes.z,
        command: "Redo" /* Redo */
    },
    // Bullet for Mac: Command (meta) + .
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.period,
        command: "Bullet" /* Bullet */
    },
    // Numbering for Mac: Command (meta) + /
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.forwardSlash,
        command: "Numbering" /* Numbering */
    },
    // Insert link for Mac: Command (meta) + k
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.k,
        command: "InsertLink" /* InsertLink */
    },
    // Clear format for Mac: Command (meta) + space
    {
        metaKey: true,
        ctrlKey: false,
        shiftKey: false,
        which: Utilities_1.KeyCodes.space,
        command: "ClearFormat" /* ClearFormat */
    }
];
var winCommands = [
    // Bold for Windows: Ctrl + B
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.b,
        command: "Bold" /* Bold */
    },
    // Italic for Windows: Ctrl + I
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.i,
        command: "Italic" /* Italic */
    },
    // Underline for Windows: Ctrl + U
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.u,
        command: "Underline" /* Underline */
    },
    // Undo for Windows: Ctrl + Z
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.z,
        command: "Undo" /* Undo */
    },
    // Redo for Windows: Ctrl + Y
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.y,
        command: "Redo" /* Redo */
    },
    // Bullet for Windows: Ctrl + .
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.period,
        command: "Bullet" /* Bullet */
    },
    // Numbering for Windows: Ctrl + /
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.forwardSlash,
        command: "Numbering" /* Numbering */
    },
    // Insert link for Windows: Ctrl + k
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.k,
        command: "InsertLink" /* InsertLink */
    },
    // Clear format for Windows: Ctrl + space
    {
        metaKey: false,
        ctrlKey: true,
        shiftKey: false,
        which: Utilities_1.KeyCodes.space,
        command: "ClearFormat" /* ClearFormat */
    }
];
function getCommandFromEvent(event) {
    if (event.eventType !== 0 /* KeyDown */) {
        return "None" /* None */;
    }
    var commands = roosterjs_editor_dom_1.Browser.isMac ? macCommands : winCommands;
    var keyboardEvent = event.rawEvent;
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var cmd = commands_1[_i];
        if (!keyboardEvent.altKey &&
            cmd.ctrlKey === keyboardEvent.ctrlKey &&
            cmd.metaKey === keyboardEvent.metaKey &&
            cmd.shiftKey === keyboardEvent.shiftKey &&
            cmd.which === keyboardEvent.which) {
            return cmd.command;
        }
    }
    return "None" /* None */;
}
exports.getCommandFromEvent = getCommandFromEvent;
//# sourceMappingURL=RoosterCommandBarPlugin.Shortcuts.js.map