"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var roosterjs_editor_core_1 = require("roosterjs-editor-core");
var ImageManager_1 = require("../utils/ImageManager");
// Max stack size that cannot be exceeded. When exceeded, old undo history will be dropped
// to keep size under limit. This is kept at 10MB.
var MAXSIZELIMIT = 10000000;
var UndoSnapshotsWithImage = /** @class */ (function () {
    function UndoSnapshotsWithImage(imageManager, maxSize) {
        this.imageManager = imageManager;
        this.maxSize = maxSize;
        this.snapshots = [];
        this.totalSize = 0;
        this.currentIndex = -1;
    }
    UndoSnapshotsWithImage.prototype.canMove = function (delta) {
        var newIndex = this.currentIndex + delta;
        return newIndex >= 0 && newIndex < this.snapshots.length;
    };
    UndoSnapshotsWithImage.prototype.move = function (delta) {
        if (!this.canMove(delta)) {
            return null;
        }
        var lastIndex = this.currentIndex;
        this.currentIndex += delta;
        var snapshot = this.snapshots[this.currentIndex];
        // There is a chance snapshots were saved with placeholders. To resolve that,
        // we optimistically ask Image Manager to replace the placeholders with images,
        // since the manager caches placeholder IDs to final image URLs (when they are resolved).
        // The manager returns the final HTML and also if all of the placeholders are resolved.
        if (snapshot.hasPlaceholder) {
            var originalValue = snapshot.value;
            var result = this.imageManager.updatePlaceholders(originalValue);
            snapshot.hasPlaceholder = !result.resolvedAll;
            snapshot.value = result.html;
            var sizeDelta = originalValue.length - result.html.length;
            // if we undo/redo and the content is the same after updating the placeholders, keep moving
            // (we get two snapshots when inserting an image, one for the placeholder, and another when the placeholder is resolved)
            var lastSnapshot = this.snapshots[lastIndex];
            if (lastSnapshot && lastSnapshot.value === snapshot.value && delta !== 0) {
                // since content is the same, remove the last "duplicated" snapshot
                this.totalSize -= snapshot.value.length;
                this.snapshots.splice(lastIndex);
                // then, move again by one unit at a time and until content is different after resolving placeholders
                return this.move(delta < 0 ? -1 : 1);
            }
            else {
                // it is possible total size is greater at this point (unlikely if default spinner is used)
                this.totalSize -= sizeDelta;
            }
        }
        return snapshot.value;
    };
    UndoSnapshotsWithImage.prototype.addSnapshot = function (value) {
        if (this.currentIndex > -1 && value === this.snapshots[this.currentIndex].value) {
            return;
        }
        this.clearRedo();
        this.snapshots.push({ value: value, hasPlaceholder: ImageManager_1.hasPlaceholder(value) });
        ++this.currentIndex;
        this.totalSize += value.length;
        var removeCount = 0;
        while (removeCount < this.snapshots.length && this.totalSize > this.maxSize) {
            this.totalSize -= this.snapshots[removeCount].value.length;
            removeCount++;
        }
        if (removeCount > 0) {
            this.snapshots.splice(0, removeCount);
            this.currentIndex -= removeCount;
        }
    };
    UndoSnapshotsWithImage.prototype.clearRedo = function () {
        if (!this.canMove(1)) {
            return;
        }
        var removedSize = 0;
        for (var i = this.currentIndex + 1; i < this.snapshots.length; ++i) {
            removedSize += this.snapshots[i].value.length;
        }
        this.snapshots.splice(this.currentIndex + 1);
        this.totalSize -= removedSize;
    };
    return UndoSnapshotsWithImage;
}());
var UndoWithImagePlugin = /** @class */ (function (_super) {
    __extends(UndoWithImagePlugin, _super);
    /**
     * Create an instance of Undo
     * @param preserveSnapshots True to preserve the snapshots after dispose, this allows
     * this object to be reused when editor is disposed and created again
     * @param bufferSize The buffer size for snapshots. Default value is 10MB, it is possible after
     * placeholder to image resolution that buffer size is greater.
     */
    function UndoWithImagePlugin(imageManager, preserveSnapshots, bufferSize) {
        if (bufferSize === void 0) { bufferSize = MAXSIZELIMIT; }
        var _this = _super.call(this, preserveSnapshots, bufferSize) || this;
        _this.imageManager = imageManager;
        _this.bufferSize = bufferSize;
        return _this;
    }
    UndoWithImagePlugin.prototype.getSnapshotsManager = function () {
        if (!this.undoSnapshots) {
            this.undoSnapshots = new UndoSnapshotsWithImage(this.imageManager, this.bufferSize);
        }
        return this.undoSnapshots;
    };
    UndoWithImagePlugin.prototype.reset = function (initialContent) {
        this.clear();
        this.getSnapshotsManager().addSnapshot(initialContent);
    };
    return UndoWithImagePlugin;
}(roosterjs_editor_core_1.Undo));
exports.default = UndoWithImagePlugin;
//# sourceMappingURL=UndoWithImagePlugin.js.map