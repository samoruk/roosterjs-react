"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataAndAriaProps = exports.css = void 0;
var CssHandlers = {
    object: function (obj, result) {
        for (var key in obj) {
            if (obj[key]) {
                result.push(key);
            }
        }
    },
    string: function (str, result) { return result.push(str); }
};
function css() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = [];
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var arg = args_1[_a];
        var handler = CssHandlers[typeof arg];
        if (arg && handler) {
            handler(arg, result);
        }
    }
    return result.join(' ');
}
exports.css = css;
function reduceObject(object, callback) {
    if (!object) {
        return object;
    }
    return Object.keys(object).reduce(function (result, key) {
        if (callback(key)) {
            result[key] = object[key];
        }
        return result;
    }, {});
}
function getDataAndAriaProps(props) {
    return reduceObject(props || {}, function (propName) { return propName.indexOf('data-') === 0 || propName.indexOf('aria-') === 0; });
}
exports.getDataAndAriaProps = getDataAndAriaProps;
//# sourceMappingURL=ReactUtil.js.map