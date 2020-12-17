"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPlaceholder = exports.PlaceholderDataAttribute = void 0;
var Images_1 = require("../resources/Images");
var Styles = require("../scss/core.scss.g");
var ReactUtil_1 = require("../utils/ReactUtil");
var PlaceholderDataName = 'paste-image-placeholder-804b751e';
exports.PlaceholderDataAttribute = "data-" + PlaceholderDataName;
function hasPlaceholder(html) {
    return html.indexOf(exports.PlaceholderDataAttribute) > -1; // quick and dirty check
}
exports.hasPlaceholder = hasPlaceholder;
var ImageManager = /** @class */ (function () {
    function ImageManager(options) {
        var _this = this;
        this.idToUrlImageCache = {};
        this.defaultCreateImagePlaceholder = function (editor, image) {
            if (editor.isDisposed()) {
                return null;
            }
            var result = editor.getDocument().createElement('img');
            result.src = Images_1.Base64Svgs.RoosterJsReactSpinner;
            result.className = ReactUtil_1.css(Styles.roosterjsReactSpinner, _this.options.placeholderImageClassName);
            return result;
        };
        this.options = __assign({}, options);
        this.options.createImagePlaceholder = this.options.createImagePlaceholder || this.defaultCreateImagePlaceholder;
        this.placeholderImageClasses = this.options.placeholderImageClassName ? this.options.placeholderImageClassName.split(' ') : undefined;
    }
    ImageManager.prototype.upload = function (editor, image, forceFallbackAltValue) {
        var _this = this;
        if (!image || image.size === 0) {
            return null;
        }
        var placeholder = this.options.createImagePlaceholder(editor, image);
        if (placeholder === null) {
            return null;
        }
        var altText = "";
        if (forceFallbackAltValue) {
            altText = this.options.fallbackAltValue;
        }
        else {
            altText = image.name || this.options.fallbackAltValue;
        }
        // note: add identification (to handle undo/redo scenarios)
        var placeholdId = (ImageManager.Id++).toString(10);
        placeholder.setAttribute(exports.PlaceholderDataAttribute, placeholdId);
        this.options.uploadImage(image).then(function (url) {
            // accepted, so replace the placeholder with final image
            _this.idToUrlImageCache[placeholdId] = url;
            if (editor.isDisposed() || !editor.contains(placeholder)) {
                return;
            }
            _this.replacePlaceholder(placeholder, url, editor, altText || "Image");
            _this.triggerChangeEvent(editor);
        }, function () {
            // rejected, so remove the placeholder
            if (editor.isDisposed() || !editor.contains(placeholder)) {
                return;
            }
            _this.idToUrlImageCache[placeholdId] = null;
            _this.removePlaceholder(placeholder, editor);
            _this.triggerChangeEvent(editor);
        });
        return placeholder;
    };
    ImageManager.prototype.updatePlaceholders = function (html) {
        // example: <TAG data-paste-image-placeholder-804b751e="10" />
        var container = document.createElement('div');
        container.innerHTML = html;
        var placeholders = container.querySelectorAll("[" + exports.PlaceholderDataAttribute + "]");
        var resolvedAll = true;
        for (var i = 0; i < placeholders.length; ++i) {
            var placeholder = placeholders[i];
            var id = placeholder.getAttribute(exports.PlaceholderDataAttribute);
            var url = this.idToUrlImageCache[id];
            if (url === undefined) {
                resolvedAll = false;
                continue;
            }
            if (url === null) {
                this.removePlaceholder(placeholder);
            }
            else {
                this.replacePlaceholder(placeholder, url);
            }
        }
        return { html: container.innerHTML, resolvedAll: resolvedAll };
    };
    ImageManager.prototype.triggerChangeEvent = function (editor) {
        editor.triggerContentChangedEvent('ImageManager');
    };
    ImageManager.prototype.removePlaceholder = function (placeholder, editor) {
        if (editor) {
            editor.deleteNode(placeholder);
            editor.addUndoSnapshot();
        }
        else {
            var parent_1 = placeholder.parentNode;
            if (parent_1) {
                parent_1.removeChild(placeholder);
            }
        }
    };
    ImageManager.prototype.replacePlaceholder = function (placeholder, url, editor, altText) {
        var _a;
        // just update attributes if placeholder is already an image tag
        var img;
        if (placeholder.tagName === 'IMG') {
            img = placeholder;
            img.src = url;
            (_a = img.classList).remove.apply(_a, __spreadArrays([Styles.roosterjsReactSpinner], this.placeholderImageClasses));
            placeholder.removeAttribute(exports.PlaceholderDataAttribute);
            if (img.classList.length === 0) {
                placeholder.removeAttribute('class');
            }
        }
        else {
            var doc = editor ? editor.getDocument() : document; // editor can be null when called from updatePlaceholders
            // create final IMG node
            img = doc.createElement('img');
            img.src = url;
            if (editor) {
                editor.replaceNode(placeholder, img);
                editor.addUndoSnapshot();
            }
            else {
                doc.replaceChild(img, placeholder);
            }
        }
        img.setAttribute("alt", altText);
    };
    ImageManager.Id = 0;
    return ImageManager;
}());
exports.default = ImageManager;
//# sourceMappingURL=ImageManager.js.map