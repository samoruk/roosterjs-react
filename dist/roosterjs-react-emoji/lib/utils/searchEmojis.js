"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchShortcut = exports.searchEmojis = void 0;
var emojiList_1 = require("./emojiList");
function searchEmojis(search, strings) {
    var shortcutMatch = matchShortcut(search);
    search = search.toLowerCase();
    var fullMatch = shortcutMatch ? [shortcutMatch] : [];
    var partialMatch = [];
    var partialSearch = " " + (search[0] == ":" ? search.substr(1) : search);
    emojiList_1.forEachEmoji(function (emoji) {
        var keywords = strings[emoji.keywords] || "";
        var searchableKeywords = emoji.keywords ? " " + keywords.toLowerCase() + " " : "";
        var index = searchableKeywords.indexOf(partialSearch);
        if (index >= 0) {
            (searchableKeywords[index + partialSearch.length] == " " ? fullMatch : partialMatch).push(emoji);
        }
        return true;
    });
    return fullMatch.concat(partialMatch);
}
exports.searchEmojis = searchEmojis;
function matchShortcut(search) {
    var result;
    search = " " + search + " ";
    emojiList_1.forEachEmoji(function (emoji) {
        if (emoji.shortcut && (" " + emoji.shortcut + " ").indexOf(search) >= 0) {
            result = emoji;
            return false;
        }
        return true;
    });
    return result;
}
exports.matchShortcut = matchShortcut;
//# sourceMappingURL=searchEmojis.js.map