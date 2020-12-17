import * as React from "react";
export declare type FocusEventHandler = (ev: React.FocusEvent<HTMLElement>) => void;
export interface FocusOutShellProps {
    allowMouseDown?: (target: HTMLElement) => boolean;
    className?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
    children: (calloutClassName: string, calloutOnDismiss: FocusEventHandler) => React.ReactNode;
    shouldCallBlur?: (nextTarget: HTMLElement, shouldCallBlurDefault: (nextTarget: HTMLElement) => boolean) => boolean;
}
export interface FocusOutShellState {
    isFocused?: boolean;
}
export default class FocusOutShell extends React.PureComponent<FocusOutShellProps, FocusOutShellState> {
    private static readonly BaseClassName;
    private static readonly CalloutClassName;
    private static NextId;
    private _calloutClassName;
    private _containerDiv;
    constructor(props: FocusOutShellProps);
    render(): JSX.Element;
    private _calloutOnDismiss;
    private _onBlur;
    private _shouldCallBlur;
    private _shouldCallBlurDefault;
    private _onFocus;
    private _onFocusNative;
    private _onMouseDown;
    private _containerDivOnRef;
}
