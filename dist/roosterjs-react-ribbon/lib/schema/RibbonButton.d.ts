/// <reference types="react" />
import { FormatState } from 'roosterjs-editor-types';
import { Editor } from 'roosterjs-editor-core';
import { Strings, RibbonButtonStringKey } from '../strings/ribbonButtonStrings';
/**
 * State of button on ribbon
 */
export declare const enum RibbonButtonState {
    /**
     * A normal button
     */
    Normal = 0,
    /**
     * A button in checked state
     */
    Checked = 1,
    /**
     * A disabled button
     */
    Disabled = 2
}
/**
 * Button on ribbon
 */
interface RibbonButton {
    /**
     * Name of the button
     */
    name: RibbonButtonStringKey;
    /**
     * A call back to get a drop down UI when click on this button
     */
    dropdown?: (targetElement: HTMLElement, editor: Editor, onDismiss: () => void, strings: Strings, currentFormat: FormatState) => JSX.Element;
    /**
     * A callback to get current state of this button
     */
    buttonState?: (formatState: FormatState) => RibbonButtonState;
    /**
     * onClick event handler
     */
    onClick?: (editor: Editor, strings: Strings) => void;
}
export default RibbonButton;
