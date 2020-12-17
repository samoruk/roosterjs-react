import "./RoosterCommandBar.scss.g";
import * as React from "react";
import { RoosterCommandBarProps, RoosterCommandBarState } from "../schema/RoosterCommandBarSchema";
export default class RoosterCommandBar extends React.PureComponent<RoosterCommandBarProps, RoosterCommandBarState> {
    private static IdCounter;
    private _id;
    private _async;
    private _updateFormatStateDebounced;
    private _fileInput;
    private _buttons;
    constructor(props: RoosterCommandBarProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: RoosterCommandBarProps, nextState: RoosterCommandBarState): void;
    refreshFormatState(): void;
    private _initButtons;
    private _fileInputOnRef;
    private _fileInputOnChange;
    private _refreshButtonStatesCore;
    private _refreshButtonStates;
    private _refreshChildButtonStates;
    private _createButton;
    private _createChildButton;
    private _onCommandBarButtonClick;
    private _updateFormatState;
    private _hasFormatStateChanged;
}
