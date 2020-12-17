"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getString = exports.registerDefaultString = void 0;
var defaultStrings = {};
function registerDefaultString(category, strings) {
    defaultStrings[category] = strings;
}
exports.registerDefaultString = registerDefaultString;
function getString(category, name, strings) {
    var str = (strings || {})[name];
    if (str == null) {
        str = defaultStrings[category][name];
    }
    return str;
}
exports.getString = getString;
//# sourceMappingURL=strings.js.map