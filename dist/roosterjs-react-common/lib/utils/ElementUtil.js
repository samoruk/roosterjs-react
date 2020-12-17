"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closest = void 0;
function closest(element, query) {
    if (element && element.closest) {
        return element.closest(query);
    }
    // for IE11 and below
    while (element && !(element.matches || element.msMatchesSelector).call(element, query)) {
        element = element.parentElement;
    }
    return element;
}
exports.closest = closest;
//# sourceMappingURL=ElementUtil.js.map