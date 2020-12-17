import * as React from 'react';
export interface FontSizePickerProps {
    menuTargetElement: HTMLElement;
    onDismissMenu: () => void;
    onSelectSize: (size: string) => void;
    selectedSize?: string;
}
export default class FontSizePicker extends React.Component<FontSizePickerProps, {}> {
    private createMenuItems;
    render(): JSX.Element;
}
