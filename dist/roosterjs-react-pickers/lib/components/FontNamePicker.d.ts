import * as React from 'react';
export interface Font {
    name: string;
    family: string;
    localizedName?: string;
}
export interface FontNamePickerProps {
    menuTargetElement: HTMLElement;
    onDismissMenu: () => void;
    onSelectName: (value: Font) => void;
    selectedName?: string;
}
export default class FontNamePicker extends React.Component<FontNamePickerProps, {}> {
    private createMenuItems;
    render(): JSX.Element;
}
