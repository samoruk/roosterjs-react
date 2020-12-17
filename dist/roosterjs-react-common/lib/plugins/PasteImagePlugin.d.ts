import { Editor, EditorPlugin } from "roosterjs-editor-core";
import { PluginEvent } from "roosterjs-editor-types";
import { ImageManagerInteface } from "../utils/ImageManager";
export default class PasteImagePlugin implements EditorPlugin {
    private imageManager;
    private preventImagePaste;
    private editor;
    constructor(imageManager: ImageManagerInteface, preventImagePaste?: boolean);
    getName(): string;
    initialize(editor: Editor): void;
    dispose(): void;
    onPluginEvent(event: PluginEvent): void;
    setPreventImagePaste(enabled?: boolean): void;
    getEditor(): Editor;
}
