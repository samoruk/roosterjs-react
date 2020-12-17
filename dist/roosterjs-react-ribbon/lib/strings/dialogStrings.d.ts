import { Strings } from 'roosterjs-react-common/lib';
export declare const dialogStrings: {
    dlgOk: string;
    dlgCancel: string;
};
export declare type DialogStringKey = keyof typeof dialogStrings;
export declare function getString(name: DialogStringKey, strings?: Strings): string;
export { Strings };
