import RibbonComponent from '../schema/RibbonComponent';
import { Editor, EditorPlugin } from 'roosterjs-editor-core';
import { PluginEvent } from 'roosterjs-editor-types';
export default class RibbonPlugin implements EditorPlugin {
    private onButtonClick?;
    private editor;
    private ribbons;
    constructor(onButtonClick?: (buttonName: string) => void);
    getName(): string;
    initialize(editor: Editor): void;
    dispose(): void;
    onPluginEvent(event: PluginEvent): void;
    getEditor(): Editor;
    buttonClick(buttonName: string): void;
    registerRibbonComponent(ribbon: RibbonComponent): void;
    unregisterRibbonComponent(ribbon: RibbonComponent): void;
    resize(): void;
}
