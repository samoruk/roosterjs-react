import * as React from "react";
import { Editor } from "roosterjs-editor-core";
import { Strings } from "roosterjs-react-common";
export declare const InsertLinkStringKeys: {
    LinkFieldLabel: string;
    Title: string;
    InsertButton: string;
    CancelButton: string;
};
export interface LinkDialogProps {
    className?: string;
    onDismiss?: (ev: React.FocusEvent<HTMLElement>) => void;
    editor: Editor;
    strings?: Strings;
    selectionRange?: Range;
}
export interface LinkDialogState {
    insertButtonDisabled: boolean;
}
export declare function createLinkDialog(doc: Document, props: LinkDialogProps, calloutClassName?: string): () => void;
