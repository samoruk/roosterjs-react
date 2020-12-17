export declare type Strings = {
    [key: string]: string;
};
export declare function registerDefaultString(category: string, strings: Strings): void;
export declare function getString(category: string, name: string, strings?: Strings): string;
