import * as React from 'react';
import RibbonProps from '../schema/RibbonProps';
import { FormatState } from 'roosterjs-editor-types';
export interface RibbonState {
    dropDown: string;
    formatState: FormatState;
    visibleItemCount: number;
}
export default class Ribbon extends React.Component<RibbonProps, RibbonState> {
    private buttonElements;
    private ribbonStateJobId;
    private ribbonContainer;
    private buttonNames;
    private moreButton;
    constructor(props: RibbonProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    onResize(): void;
    onFormatChange(): void;
    private renderRibbonButton;
    private setCurrentDropDown;
    private setFormatState;
    private onRibbonButton;
    private getButton;
    private updateRibbonState;
    private isFormatStateChanged;
    private getMinItemCount;
    private onDismiss;
    private cancelEvent;
}
