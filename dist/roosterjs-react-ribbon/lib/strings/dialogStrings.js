"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getString = exports.dialogStrings = void 0;
var lib_1 = require("roosterjs-react-common/lib");
var STRING_CATEGORY = 'ROOSTERJS_STRINGS_DIALOG';
exports.dialogStrings = {
    // Dialogs:
    dlgOk: 'OK',
    dlgCancel: 'Cancel'
};
lib_1.registerDefaultString(STRING_CATEGORY, exports.dialogStrings);
function getString(name, strings) {
    return lib_1.getString(STRING_CATEGORY, name, strings);
}
exports.getString = getString;
//# sourceMappingURL=dialogStrings.js.map