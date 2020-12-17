import * as React from 'react';
import { Strings, ColorStringKey } from '../strings/colorStrings';
export interface ColorPickerItem {
    name: ColorStringKey;
    code: string;
    borderColor?: string;
}
export declare const textColors: ColorPickerItem[];
export declare const blackColors: ColorPickerItem[];
export interface ColorPickerProps {
    menuTargetElement: HTMLElement;
    colors: ColorPickerItem[];
    onDismissMenu: () => void;
    onSelectColor: (value: ColorPickerItem) => void;
    strings?: Strings;
}
export default class ColorPicker extends React.Component<ColorPickerProps, {}> {
    private renderColorMenuItem;
    private onSelectColor;
    render(): JSX.Element;
}
