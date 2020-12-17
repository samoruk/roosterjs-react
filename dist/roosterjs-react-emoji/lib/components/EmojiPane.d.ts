import * as React from "react";
import { Strings } from "roosterjs-react-common";
import Emoji from "../schema/Emoji";
import { EmojiFamilyKeys } from "../utils/emojiList";
import { EmojiIconProps } from "./EmojiIcon";
import { EmojiNavBarProps } from "./EmojiNavBar";
import { EmojiStatusBarProps } from "./EmojiStatusBar";
export declare const enum EmojiPaneMode {
    Quick = 0,
    Partial = 1,
    Full = 2
}
export declare const enum EmojiPaneNavigateDirection {
    Horizontal = 0,
    Vertical = 1
}
export interface EmojiPaneState {
    index: number;
    mode: EmojiPaneMode;
    currentEmojiList: Emoji[];
    currentFamily: EmojiFamilyKeys;
    search: string;
    searchInBox: string;
}
export interface EmojiPaneProps {
    quickPickerClassName?: string;
    fullPickerClassName?: string;
    fullListClassName?: string;
    fullListContentClassName?: string;
    partialListClassName?: string;
    tooltipClassName?: string;
    searchInputAriaLabel?: string;
    searchPlaceholder?: string;
    onLayoutChanged?: () => void;
    onModeChanged?: (newMode: EmojiPaneMode, previousMode: EmojiPaneMode) => void;
    navBarProps?: Partial<EmojiNavBarProps>;
    statusBarProps?: Partial<EmojiStatusBarProps>;
    emojiIconProps?: Partial<EmojiIconProps>;
    searchDisabled?: boolean;
    hideStatusBar?: boolean;
}
export interface InternalEmojiPaneProps extends EmojiPaneProps {
    onSelect: (emoji: Emoji, wordBeforeCursor: string) => void;
    strings: Strings;
    onLayoutChange?: () => void;
}
export default class EmojiPane extends React.PureComponent<InternalEmojiPaneProps, EmojiPaneState> {
    private static IdCounter;
    private _baseId;
    private _searchBox;
    private _listId;
    private _emojiBody;
    private _input;
    static defaultProps: EmojiPaneProps;
    constructor(props: InternalEmojiPaneProps);
    render(): JSX.Element;
    componentDidUpdate(_: EmojiPaneProps, prevState: EmojiPaneState): void;
    navigate(change: number, direction?: EmojiPaneNavigateDirection): number;
    getEmojiElementIdByIndex(index: number): string;
    getSelectedEmoji(): Emoji;
    showFullPicker(fullSearchText: string): void;
    setSearch(value: string): void;
    get listId(): string;
    private _normalizeSearchText;
    private _getSearchResult;
    private _renderQuickPicker;
    private _renderFullPicker;
    private _onSearchFocus;
    private _onSearchKeyPress;
    private _onSearchKeyDown;
    private _renderCurrentEmojiIcons;
    private _getEmojiIconId;
    private _renderPartialList;
    private _renderFullList;
    private _onEmojiBodyRef;
    private _pivotClick;
    private _getTabId;
    private _searchRefCallback;
    private _focusZoneRefCallback;
    private _onSearchChange;
    private _onSelect;
}
