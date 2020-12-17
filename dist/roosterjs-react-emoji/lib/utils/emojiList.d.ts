import Emoji from "../schema/Emoji";
export declare const MoreEmoji: Emoji;
export declare const CommonEmojis: Emoji[];
export declare const enum EmojiFamilyKeys {
    People = "People",
    Nature = "Nature",
    Activities = "Activities",
    Food = "Food",
    Travel = "Travel",
    Symbols = "Symbols",
    Objects = "Objects"
}
declare const EmojiList: {
    People: Emoji[];
    Nature: Emoji[];
    Activities: Emoji[];
    Food: Emoji[];
    Travel: Emoji[];
    Symbols: Emoji[];
    Objects: Emoji[];
};
export default EmojiList;
export declare const EmojiFabricIconCharacterMap: {
    Activities: string;
    Food: string;
    Nature: string;
    Objects: string;
    People: string;
    Symbols: string;
    Travel: string;
};
export declare function forEachEmojiFamily(callback: (emojis: Emoji[], family: EmojiFamilyKeys) => boolean): void;
export declare function forEachEmoji(callback: (emoji: Emoji) => boolean): void;
