import { Editor, EditorPlugin } from "roosterjs-editor-core";
import { PluginEvent } from "roosterjs-editor-types";
import { Strings } from "roosterjs-react-common";
import RoosterCommandBar from "../components/RoosterCommandBar";
import RoosterCommandBarPluginInterface from "../schema/RoosterCommandBarPluginInterface";
import { RoosterShortcutCommands } from "./RoosterCommandBarPlugin.Shortcuts";
export declare const InsertLinkStringKeys: {
    LinkFieldLabel: string;
    Title: string;
    InsertButton: string;
    CancelButton: string;
};
export interface RoosterCommandBarPluginOptions {
    strings?: Strings;
    calloutClassName?: string;
    linkDialogClassName?: string;
    calloutOnDismiss?: (ev?: any) => void;
    onShortcutTriggered?: (command: RoosterShortcutCommands) => void;
    disableListWorkaround?: boolean;
    useLegacyClearFormat?: boolean;
}
export default class RoosterCommandBarPlugin implements EditorPlugin, RoosterCommandBarPluginInterface {
    private options;
    private static readonly EventTypesToRefreshFormatState;
    private editor;
    private commandBars;
    private dialogDismiss;
    constructor(options?: RoosterCommandBarPluginOptions);
    getName(): string;
    initialize(editor: Editor): void;
    dispose(): void;
    onPluginEvent(event: PluginEvent): void;
    private handleShortcuts;
    getEditor(): Editor;
    registerRoosterCommandBar(commandBar: RoosterCommandBar): void;
    unregisterRoosterCommandBar(commandBar: RoosterCommandBar): void;
    promptForLink(): void;
    clearFormat(): void;
}
