import * as React from "react";
import { Strings } from "roosterjs-react-common";
import Emoji from "../schema/Emoji";
export interface EmojiStatusBarProps {
    emoji: Emoji;
    strings: Strings;
    className?: string;
    hasResult: boolean;
}
export default class EmojiStatusBar extends React.Component<EmojiStatusBarProps, {}> {
    render(): JSX.Element;
}
