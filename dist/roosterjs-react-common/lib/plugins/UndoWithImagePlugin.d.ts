import { Undo } from 'roosterjs-editor-core';
import { UndoSnapshotsService } from 'roosterjs-editor-core';
import { ImageManagerInteface } from '../utils/ImageManager';
export default class UndoWithImagePlugin extends Undo {
    private imageManager;
    private bufferSize;
    /**
     * Create an instance of Undo
     * @param preserveSnapshots True to preserve the snapshots after dispose, this allows
     * this object to be reused when editor is disposed and created again
     * @param bufferSize The buffer size for snapshots. Default value is 10MB, it is possible after
     * placeholder to image resolution that buffer size is greater.
     */
    constructor(imageManager: ImageManagerInteface, preserveSnapshots?: boolean, bufferSize?: number);
    protected getSnapshotsManager(): UndoSnapshotsService;
    reset(initialContent: string): void;
}
