import { Editor, EditorPlugin } from "roosterjs-editor-core";
import { PluginEvent } from "roosterjs-editor-types";
export default class IgnorePasteImagePlugin implements EditorPlugin {
    private editor;
    private static InternalInstance;
    private constructor();
    static get Instance(): IgnorePasteImagePlugin;
    getName(): string;
    initialize(editor: Editor): void;
    dispose(): void;
    onPluginEvent(event: PluginEvent): void;
    getEditor(): Editor;
}
