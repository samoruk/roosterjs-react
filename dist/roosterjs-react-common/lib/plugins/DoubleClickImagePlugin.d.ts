import { Editor, EditorPlugin } from 'roosterjs-editor-core';
export default class DoubleClickImagePlugin implements EditorPlugin {
    private doubleClickImageSelector;
    private onDoubleClickDisposer;
    private editor;
    constructor(doubleClickImageSelector?: string);
    getName(): string;
    initialize(editor: Editor): void;
    dispose(): void;
    getEditor(): Editor;
    private onDoubleClick;
}
