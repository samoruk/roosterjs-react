import * as React from "react";
import { Strings } from "roosterjs-react-common";
export interface EmojiNavBarProps {
    onClick?: (selected: string) => void;
    currentSelected?: string;
    getTabId?: (selected: string) => string;
    className?: string;
    buttonClassName?: string;
    selectedButtonClassName?: string;
    iconClassName?: string;
    strings: Strings;
}
export default class EmojiNavBar extends React.Component<EmojiNavBarProps, {}> {
    render(): JSX.Element;
    private onFamilyClick;
}
