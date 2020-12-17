import { PluginEvent } from 'roosterjs-editor-types';
export declare const enum RoosterShortcutCommands {
    None = "None",
    Bold = "Bold",
    Italic = "Italic",
    Underline = "Underline",
    Undo = "Undo",
    Redo = "Redo",
    Bullet = "Bullet",
    Numbering = "Numbering",
    InsertLink = "InsertLink",
    ClearFormat = "ClearFormat"
}
export declare function getCommandFromEvent(event: PluginEvent): RoosterShortcutCommands;
