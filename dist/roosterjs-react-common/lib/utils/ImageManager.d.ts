import { Editor } from 'roosterjs-editor-core';
export interface ImageManagerInteface {
    upload: (editor: Editor, image: File, forceFallbackAltValue?: boolean) => HTMLElement;
    updatePlaceholders: (html: string) => UpdatePlaceholdersResult;
}
export interface ImageManagerOptions {
    uploadImage: (file: File) => Promise<string>;
    createImagePlaceholder?: (editor: Editor, image: File) => HTMLImageElement;
    placeholderImageClassName?: string;
    fallbackAltValue?: string;
}
export declare const PlaceholderDataAttribute: string;
export declare function hasPlaceholder(html: string): boolean;
export interface UpdatePlaceholdersResult {
    resolvedAll: boolean;
    html: string;
}
export default class ImageManager implements ImageManagerInteface {
    private static Id;
    private idToUrlImageCache;
    private options;
    private placeholderImageClasses;
    constructor(options: ImageManagerOptions);
    upload(editor: Editor, image: File, forceFallbackAltValue?: boolean): HTMLImageElement;
    updatePlaceholders(html: string): UpdatePlaceholdersResult;
    private triggerChangeEvent;
    private removePlaceholder;
    private replacePlaceholder;
    private defaultCreateImagePlaceholder;
}
