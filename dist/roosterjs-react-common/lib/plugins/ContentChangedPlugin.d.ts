import { Editor, EditorPlugin } from "roosterjs-editor-core";
import { PluginEvent } from "roosterjs-editor-types";
export default class ContentChangedPlugin implements EditorPlugin {
    private onChange;
    private changeDisposer;
    private textInputDisposer;
    private pasteDisposer;
    protected editor: Editor;
    constructor(onChange: (newValue: string) => void);
    getName(): string;
    initialize(editor: Editor): void;
    onPluginEvent(event: PluginEvent): void;
    dispose(): void;
    private onChangeEvent;
}
