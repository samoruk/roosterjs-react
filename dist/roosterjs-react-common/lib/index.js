"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaAttributes = exports.Base64Svgs = exports.UndoWithImagePlugin = exports.IgnorePasteImagePlugin = exports.PasteImagePlugin = exports.DoubleClickImagePlugin = exports.ContentChangedPlugin = exports.ImageManager = exports.getDataAndAriaProps = exports.css = exports.toggleNonCompatNumbering = exports.toggleNonCompatBullet = exports.setNonCompatIndentation = exports.closest = exports.NullFunction = exports.getString = exports.registerDefaultString = void 0;
var strings_1 = require("./strings/strings");
Object.defineProperty(exports, "registerDefaultString", { enumerable: true, get: function () { return strings_1.registerDefaultString; } });
Object.defineProperty(exports, "getString", { enumerable: true, get: function () { return strings_1.getString; } });
var Core_1 = require("./utils/Core");
Object.defineProperty(exports, "NullFunction", { enumerable: true, get: function () { return Core_1.NullFunction; } });
var ElementUtil_1 = require("./utils/ElementUtil");
Object.defineProperty(exports, "closest", { enumerable: true, get: function () { return ElementUtil_1.closest; } });
var NonCompatFormatter_1 = require("./utils/NonCompatFormatter");
Object.defineProperty(exports, "setNonCompatIndentation", { enumerable: true, get: function () { return NonCompatFormatter_1.setNonCompatIndentation; } });
Object.defineProperty(exports, "toggleNonCompatBullet", { enumerable: true, get: function () { return NonCompatFormatter_1.toggleNonCompatBullet; } });
Object.defineProperty(exports, "toggleNonCompatNumbering", { enumerable: true, get: function () { return NonCompatFormatter_1.toggleNonCompatNumbering; } });
var ReactUtil_1 = require("./utils/ReactUtil");
Object.defineProperty(exports, "css", { enumerable: true, get: function () { return ReactUtil_1.css; } });
Object.defineProperty(exports, "getDataAndAriaProps", { enumerable: true, get: function () { return ReactUtil_1.getDataAndAriaProps; } });
var ImageManager_1 = require("./utils/ImageManager");
Object.defineProperty(exports, "ImageManager", { enumerable: true, get: function () { return ImageManager_1.default; } });
var ContentChangedPlugin_1 = require("./plugins/ContentChangedPlugin");
Object.defineProperty(exports, "ContentChangedPlugin", { enumerable: true, get: function () { return ContentChangedPlugin_1.default; } });
var DoubleClickImagePlugin_1 = require("./plugins/DoubleClickImagePlugin");
Object.defineProperty(exports, "DoubleClickImagePlugin", { enumerable: true, get: function () { return DoubleClickImagePlugin_1.default; } });
var PasteImagePlugin_1 = require("./plugins/PasteImagePlugin");
Object.defineProperty(exports, "PasteImagePlugin", { enumerable: true, get: function () { return PasteImagePlugin_1.default; } });
var IgnorePasteImagePlugin_1 = require("./plugins/IgnorePasteImagePlugin");
Object.defineProperty(exports, "IgnorePasteImagePlugin", { enumerable: true, get: function () { return IgnorePasteImagePlugin_1.default; } });
var UndoWithImagePlugin_1 = require("./plugins/UndoWithImagePlugin");
Object.defineProperty(exports, "UndoWithImagePlugin", { enumerable: true, get: function () { return UndoWithImagePlugin_1.default; } });
var Images_1 = require("./resources/Images");
Object.defineProperty(exports, "Base64Svgs", { enumerable: true, get: function () { return Images_1.Base64Svgs; } });
var Accessibility_1 = require("./utils/Accessibility");
Object.defineProperty(exports, "AriaAttributes", { enumerable: true, get: function () { return Accessibility_1.AriaAttributes; } });
//# sourceMappingURL=index.js.map