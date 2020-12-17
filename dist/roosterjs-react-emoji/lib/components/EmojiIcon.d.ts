import * as React from "react";
import { Strings } from "roosterjs-react-common";
import Emoji from "../schema/Emoji";
export interface EmojiIconProps {
    id: string;
    emoji: Emoji;
    strings: Strings;
    onClick?: (e: React.MouseEvent<EventTarget>) => void;
    onMouseOver?: (number: any) => void;
    onFocus?: (number: any) => void;
    isSelected?: boolean;
    className?: string;
    selectedClassName?: string;
}
export default class EmojiIcon extends React.Component<EmojiIconProps, {}> {
    render(): JSX.Element;
}
