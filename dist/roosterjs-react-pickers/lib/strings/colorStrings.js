"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getString = exports.colorStrings = void 0;
var roosterjs_react_common_1 = require("roosterjs-react-common");
var STRING_CATEGORY = 'ROOSTERJS_STRINGS_PICKERS';
exports.colorStrings = {
    // Color names
    clrLightBlue: 'Light blue',
    clrLightGreen: 'Light green',
    clrLightYellow: 'Light yellow',
    clrLightOrange: 'Light orange',
    clrLightRed: 'Light red',
    clrLightPurple: 'Light purple',
    clrBlue: 'Blue',
    clrGreen: 'Green',
    clrYellow: 'Yellow',
    clrOrange: 'Orange',
    clrRed: 'Red',
    clrPurple: 'Purple',
    clrDarkBlue: 'Dark blue',
    clrDarkGreen: 'Dark green',
    clrDarkYellow: 'Dark yellow',
    clrDarkOrange: 'Dark orange',
    clrDarkRed: 'Dark red',
    clrDarkPurple: 'Dark purple',
    clrDarkerBlue: 'Darker blue',
    clrDarkerGreen: 'Darker green',
    clrDarkerYellow: 'Darker yellow',
    clrDarkerOrange: 'Darker orange',
    clrDarkerRed: 'Darker red',
    clrDarkerPurple: 'Darker purple',
    clrWhite: 'White',
    clrLightGray: 'Light gray',
    clrGray: 'Gray',
    clrDarkGray: 'Dark gray',
    clrDarkerGray: 'Darker gray',
    clrBlack: 'Black',
    clrCyan: 'Cyan',
    clrMagenta: 'Magenta',
    clrLightCyan: 'Light cyna',
    clrLightMagenta: 'Light magenta',
};
roosterjs_react_common_1.registerDefaultString(STRING_CATEGORY, exports.colorStrings);
function getString(name, strings) {
    return roosterjs_react_common_1.getString(STRING_CATEGORY, name, strings);
}
exports.getString = getString;
//# sourceMappingURL=colorStrings.js.map