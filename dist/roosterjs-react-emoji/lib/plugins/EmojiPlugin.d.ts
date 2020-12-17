import { Editor } from "roosterjs-editor-core";
import { PluginEvent } from "roosterjs-editor-types";
import { LeanRoosterPlugin, Strings } from "roosterjs-react-common";
import { EmojiPaneProps } from "../components/EmojiPane";
export interface EmojiPluginOptions {
    strings?: Strings;
    calloutClassName?: string;
    calloutOnDismiss?: (ev?: any) => void;
    emojiPaneProps?: EmojiPaneProps;
    onKeyboardTriggered?: () => void;
}
export default class EmojiPlugin implements LeanRoosterPlugin {
    private options;
    private _editor;
    private _contentEditable;
    private _contentDiv;
    private _isSuggesting;
    private _pane;
    private _eventHandledOnKeyDown;
    private _canUndoEmoji;
    private _timer;
    private _callout;
    private _async;
    private _refreshCalloutDebounced;
    private _strings;
    constructor(options?: EmojiPluginOptions);
    getName(): string;
    initialize(editor: Editor): void;
    initializeContentEditable(contentEditable: HTMLDivElement): void;
    setStrings(strings: Strings): void;
    dispose(): void;
    willHandleEventExclusively(event: PluginEvent): boolean;
    onPluginEvent(event: PluginEvent): void;
    startEmoji(startingString?: string): void;
    private _setIsSuggesting;
    private _removeAutoCompleteAriaAttributes;
    /**
     * On KeyDown suggesting DOM event
     * Try to insert emoji is possible
     * Intercept arrow keys to move selection if popup is shown
     */
    private _onKeyDownSuggestingDomEvent;
    private _tryShowFullPicker;
    /**
     * On KeyUp suggesting DOM event
     * If key is character, update search term
     * Otherwise set isSuggesting to false
     */
    private _onKeyUpSuggestingDomEvent;
    private _onKeyUpDomEvent;
    private _insertEmoji;
    private _triggerChangeEvent;
    private _isModifierKey;
    private _handleEventOnKeyDown;
    private _getCallout;
    private _onModeChanged;
    private _paneRef;
    private _calloutRef;
    private _refreshCallout;
    private _calloutOnDismissInternal;
    private _tryPatchEmojiFont;
    private _getWordBeforeCursor;
    private _onSelectFromPane;
}
