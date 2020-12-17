import "./LeanRooster.scss.g";
import * as React from "react";
import { CoreApiMap, UndoService } from "roosterjs-editor-core";
import { ContentEditFeatures } from "roosterjs-editor-plugins";
import { DefaultFormat } from "roosterjs-editor-types";
import { AttributeCallbackMap } from "roosterjs-html-sanitizer";
import { LeanRoosterPlugin } from "roosterjs-react-common";
import EditorViewState from "../schema/EditorViewState";
export declare const enum LeanRoosterModes {
    View = 0,
    Edit = 1
}
export interface LeanRoosterInitialOptions {
    /**
     * (Optional) True to activate rooster and its plugins when component is mounted
     */
    activateRoosterOnMount?: boolean;
    /**
     * (Optional) Activate rooster in view mode instead of edit when activateRoosterOnMount is on
     */
    activateInViewMode?: boolean;
    /**
     * (Optional) Feature options for the editor
     */
    contentEditFeatures?: ContentEditFeatures;
    /**
     * (Optional) Core API override for the editor (useful for tracking timings)
     */
    coreApiOverride?: Partial<CoreApiMap>;
    /**
     * (Optional) Default format for the editor
     */
    defaultFormat?: DefaultFormat;
    /**
     * (Optional) Enable restore selection on focus
     */
    enableRestoreSelectionOnFocus?: boolean;
    /**
     * (Optional) Plugins for the editor
     */
    plugins?: LeanRoosterPlugin[];
    /**
     * (Optional) Custom undo plugin
     */
    undo?: UndoService;
    /**
     * (Optional) Callback map for santizing attributes (used by Paste plugin)
     */
    sanitizeAttributeCallbacks?: AttributeCallbackMap;
    /**
     * (Optional) Update view state callback
     */
    updateViewState?: (viewState: EditorViewState, content: string, isInitializing: boolean) => void;
    /**
     * Initial view state for the editor
     */
    viewState: EditorViewState;
}
export interface LeanRoosterProps extends LeanRoosterInitialOptions {
    /**
     * Additional CSS class(es) to apply to the ColorPicker.
     */
    className?: string;
    /**
     * (Optional) True to use right to left locale
     */
    isRtl?: boolean;
    /**
     * (Optional) Placeholder text
     */
    placeholder?: string;
    /**
     * (Optional) Threshold for isEmpty() check
     */
    thresholdForIsEmptyCheck?: number;
    /**
     * (Optional) Trim when calling isEmpty()
     */
    trimWithEmptyCheck?: boolean;
    /**
     * (Optional) True to enable readonly mode
     */
    readonly?: boolean;
    /**
     * (Optional) True to allow hyperlink to be opened while in view mode
     */
    clickOpenHyperlinkViewMode?: boolean;
    /**
     * (Optional) Callback for the content DIV reference
     */
    contentDivRef?: (ref: HTMLDivElement) => void;
    /**
     * (Optional) Callback for getting the tooltip for a hyperlink
     */
    hyperlinkToolTipCallback?: (href: string, anchor: HTMLAnchorElement) => string;
    /**
     * (Optional) Custom isEmpty() function
     */
    isEmptyFunction?: (element: HTMLDivElement, trim?: boolean) => boolean;
    /**
     * (Optional) Callback for after a mode change
     */
    onAfterModeChange?: (newMode: LeanRoosterModes) => void;
    /**
     * (Optional) Callback for before a mode change
     */
    onBeforeModeChange?: (newMode: LeanRoosterModes) => boolean;
    /**
     * (Optional) Callback for editor blur event
     */
    onBlur?: (ev: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * (Optional) Callback for editor focus event
     */
    onFocus?: (ev: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * (Optional) Callback for editor drop event
     */
    onDrop?: (ev: React.DragEvent<HTMLDivElement>) => void;
    /**
     * (Optional) Callback for editor drag enter event
     */
    onDragEnter?: (ev: React.DragEvent<HTMLDivElement>) => void;
    /**
     * (Optional) Callback for editor drag leave event
     */
    onDragLeave?: (ev: React.DragEvent<HTMLDivElement>) => void;
    /**
     * (Optional) Callback for editor drag over event
     */
    onDragOver?: (ev: React.DragEvent<HTMLDivElement>) => void;
    /**
     * (Optional) Handler for when hyperlink is clicked
     */
    onHyperlinkClick?: (anchor: HTMLAnchorElement, ev: MouseEvent) => boolean;
}
export default class LeanRooster extends React.Component<LeanRoosterProps, {}> {
    private _contentDiv;
    private _editor;
    private _mode;
    private _initialContent;
    private _editorOptions;
    private _hasPlaceholder;
    private _placeholderVisible;
    constructor(props: LeanRoosterProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: LeanRoosterProps, nextState: {}): void;
    shouldComponentUpdate(): boolean;
    get mode(): LeanRoosterModes;
    set mode(value: LeanRoosterModes);
    get hasActivated(): boolean;
    hasPlaceholder(): boolean;
    focus(): void;
    reloadContent(triggerContentChangedEvent?: boolean, resetUndo?: boolean): void;
    triggerContentChangedEvent(source?: string): void;
    selectAll(): void;
    isEmpty(): boolean;
    getContent(): string;
    private _getClassName;
    private _getDirValue;
    private _refreshPlaceholder;
    private _setInitialReactContent;
    private _updateContentToViewState;
    private _createEditorOptions;
    private _onHyperlinkClick;
    private _hyperlinkToolTipCallback;
    private _updateViewState;
    private _trySwithToEditMode;
    private _trySwitchToViewMode;
    private _onMouseDown;
    private _onMouseUp;
    private _getAnchorForClickOpenHyperlink;
    private _onBlur;
    private _onDragEnter;
    private _onDragLeave;
    private _onDragOver;
    private _onFocus;
    private _onFocusNative;
    private _onDrop;
    private _contentDivOnRef;
}
