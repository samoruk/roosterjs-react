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
var React = require("react");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var Styles = require("./Picker.scss.g");
var FIRSTFONT_REGEX = /^['"]?([^'",]+)/i;
var FONT_NAME_LIST = [
    { name: 'Arial', family: 'Arial,Helvetica,sans-serif' },
    { name: 'Arial Black', family: "'Arial Black',Arial,sans-serif" },
    { name: 'Calibri', family: 'Calibri,Helvetica,sans-serif' },
    { name: 'Calibri Light', family: "'Calibri Light','Helvetica Light',sans-serif" },
    { name: 'Cambria', family: 'Cambria,Georgia,serif' },
    { name: 'Candara', family: 'Candara,Optima,sans-serif' },
    { name: 'Century Gothic', family: "'Century Gothic',sans-serif" },
    { name: 'Comic Sans MS', family: "'Comic Sans MS',Chalkboard,cursive" },
    { name: 'Consolas', family: 'Consolas,Courier,monospace' },
    { name: 'Constantia', family: "Constantia,'Hoefler Text',serif" },
    { name: 'Corbel', family: 'Corbel,Skia,sans-serif' },
    { name: 'Courier New', family: "'Courier New',monospace" },
    {
        name: 'Franklin Gothic Book',
        family: "'Franklin Gothic Book','Avenir Next Condensed',sans-serif",
    },
    {
        name: 'Franklin Gothic Demi',
        family: "'Franklin Gothic Demi','Avenir Next Condensed Demi Bold',sans-serif",
    },
    {
        name: 'Franklin Gothic Medium',
        family: "'Franklin Gothic Medium','Avenir Next Condensed Medium',sans-serif",
    },
    { name: 'Garamond', family: 'Garamond,Georgia,serif' },
    { name: 'Georgia', family: 'Georgia,serif' },
    { name: 'Impact', family: 'Impact,Charcoal,sans-serif' },
    { name: 'Lucida Console', family: "'Lucida Console',Monaco,monospace" },
    { name: 'Lucida Handwriting', family: "'Lucida Handwriting','Apple Chancery',cursive" },
    { name: 'Lucida Sans Unicode', family: "'Lucida Sans Unicode','Lucida Grande',sans-serif" },
    { name: 'Palatino Linotype', family: "'Palatino Linotype','Book Antiqua',Palatino,serif" },
    { name: 'Segoe UI', family: "'Segoe UI','Helvetica Neue',sans-serif" },
    { name: 'Sitka Heading', family: "'Sitka Heading',Cochin,serif" },
    { name: 'Sitka Text', family: "'Sitka Text',Cochin,serif" },
    { name: 'Tahoma', family: 'Tahoma,Geneva,sans-serif' },
    { name: 'Times', family: "Times,'Times New Roman',serif" },
    { name: 'Times New Roman', family: "'Times New Roman',Times,serif" },
    { name: 'Trebuchet MS', family: "'Trebuchet MS',Trebuchet,sans-serif" },
    { name: 'TW Cen MT', family: "'TW Cen MT','Century Gothic',sans-serif" },
    { name: 'Verdana', family: 'Verdana,Geneva,sans-serif' },
    { name: '-', family: '-' },
    {
        name: 'Microsoft YaHei',
        family: "'Microsoft YaHei','微软雅黑',STHeiti,sans-serif",
        localizedName: '微软雅黑',
    },
    { name: 'SimHei', family: "SimHei,'黑体',STHeiti,sans-serif", localizedName: '黑体' },
    {
        name: 'NSimSun',
        family: "NSimSun,'新宋体',SimSun,'宋体',SimSun-ExtB,'宋体-ExtB',STSong,serif",
        localizedName: '新宋体',
    },
    { name: 'FangSong', family: "FangSong,'仿宋',STFangsong,serif", localizedName: '仿宋' },
    { name: 'SimLi', family: "SimLi,'隶书','Baoli SC',serif", localizedName: '隶书' },
    { name: 'KaiTi', family: "KaiTi,'楷体',STKaiti,serif", localizedName: '楷体' },
    { name: '-', family: '-' },
    {
        name: 'Microsoft JhengHei',
        family: "'Microsoft JhengHei','微軟正黑體','Apple LiGothic',sans-serif",
        localizedName: '微軟正黑體',
    },
    {
        name: 'PMingLiU',
        family: "PMingLiU,'新細明體',PMingLiU-ExtB,'新細明體-ExtB','Apple LiSung',serif",
        localizedName: '新細明體',
    },
    { name: 'DFKai-SB', family: "DFKai-SB,'標楷體','BiauKai',serif", localizedName: '標楷體' },
    { name: '-', family: '-' },
    {
        name: 'Meiryo',
        family: "Meiryo,'メイリオ','Hiragino Sans',sans-serif",
        localizedName: 'メイリオ',
    },
    {
        name: 'MS PGothic',
        family: "'MS PGothic','ＭＳ Ｐゴシック','MS Gothic','ＭＳ ゴシック','Hiragino Kaku Gothic ProN',sans-serif",
        localizedName: 'ＭＳ Ｐゴシック',
    },
    {
        name: 'MS PMincho',
        family: "'MS PMincho','ＭＳ Ｐ明朝','MS Mincho','ＭＳ 明朝','Hiragino Mincho ProN',serif",
        localizedName: 'ＭＳ Ｐ明朝',
    },
    {
        name: 'Yu Gothic',
        family: "'Yu Gothic','游ゴシック','YuGothic',sans-serif",
        localizedName: '游ゴシック',
    },
    { name: 'Yu Mincho', family: "'Yu Mincho','游明朝','YuMincho',serif", localizedName: '游明朝' },
    { name: '-', family: '-' },
    {
        name: 'Malgun Gothic',
        family: "'Malgun Gothic','맑은 고딕',AppleGothic,sans-serif",
        localizedName: '맑은 고딕',
    },
    { name: 'Gulim', family: "Gulim,'굴림','Nanum Gothic',sans-serif", localizedName: '굴림' },
    { name: 'Dotum', family: "Dotum,'돋움',AppleGothic,sans-serif", localizedName: '돋움' },
    { name: 'Batang', family: "Batang,'바탕',AppleMyungjo,serif", localizedName: '바탕' },
    { name: 'BatangChe', family: "BatangChe,'바탕체',AppleMyungjo,serif", localizedName: '바탕체' },
    { name: 'Gungsuh', family: "Gungsuh,'궁서',GungSeo,serif", localizedName: '궁서' },
    { name: '-', family: '-' },
    { name: 'Leelawadee UI', family: "'Leelawadee UI',Thonburi,sans-serif" },
    { name: 'Angsana New', family: "'Angsana New','Leelawadee UI',Sathu,serif" },
    { name: 'Cordia New', family: "'Cordia New','Leelawadee UI',Silom,sans-serif" },
    { name: 'DaunPenh', family: "DaunPenh,'Leelawadee UI','Khmer MN',sans-serif" },
    { name: '-', family: '-' },
    { name: 'Nirmala UI', family: "'Nirmala UI',sans-serif" },
    { name: 'Gautami', family: "Gautami,'Nirmala UI','Telugu MN',sans-serif" },
    { name: 'Iskoola Pota', family: "'Iskoola Pota','Nirmala UI','Sinhala MN',sans-serif" },
    { name: 'Kalinga', family: "Kalinga,'Nirmala UI','Oriya MN',sans-serif" },
    { name: 'Kartika', family: "Kartika,'Nirmala UI','Malayalam MN',sans-serif" },
    { name: 'Latha', family: "Latha,'Nirmala UI','Tamil MN',sans-serif" },
    { name: 'Mangal', family: "Mangal,'Nirmala UI','Devanagari Sangam MN',sans-serif" },
    { name: 'Raavi', family: "Raavi,'Nirmala UI','Gurmukhi MN',sans-serif" },
    { name: 'Shruti', family: "Shruti,'Nirmala UI','Gujarati Sangam MN',sans-serif" },
    { name: 'Tunga', family: "Tunga,'Nirmala UI','Kannada MN',sans-serif" },
    { name: 'Vrinda', family: "Vrinda,'Nirmala UI','Bangla MN',sans-serif" },
    { name: '-', family: '-' },
    { name: 'Nyala', family: 'Nyala,Kefa,sans-serif' },
    { name: 'Sylfaen', family: 'Sylfaen,Mshtakan,Menlo,serif' },
];
var FontNamePicker = /** @class */ (function (_super) {
    __extends(FontNamePicker, _super);
    function FontNamePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FontNamePicker.prototype.createMenuItems = function (selectedFont) {
        var _this = this;
        var dividerKey = 0;
        return FONT_NAME_LIST.map(function (font) {
            return font.name == '-'
                ? {
                    key: 'divider_' + (dividerKey++).toString(),
                    name: '-',
                }
                : {
                    key: font.name,
                    name: font.localizedName || font.name,
                    canCheck: true,
                    checked: selectedFont.toLowerCase() == font.name.toLowerCase(),
                    style: { fontFamily: font.family },
                    onClick: function () {
                        _this.props.onDismissMenu();
                        _this.props.onSelectName(font);
                    },
                };
        });
    };
    FontNamePicker.prototype.render = function () {
        var _a = this.props, onDismissMenu = _a.onDismissMenu, menuTargetElement = _a.menuTargetElement, selectedName = _a.selectedName;
        var fontMatches = (selectedName || '').match(FIRSTFONT_REGEX);
        selectedName = fontMatches && fontMatches.length == 2 ? fontMatches[1] : selectedName;
        return (React.createElement(ContextualMenu_1.ContextualMenu, { className: Styles.ribbonFontPicker, target: menuTargetElement, directionalHint: ContextualMenu_1.DirectionalHint.bottomLeftEdge, onDismiss: onDismissMenu, shouldFocusOnMount: true, items: this.createMenuItems(selectedName) }));
    };
    return FontNamePicker;
}(React.Component));
exports.default = FontNamePicker;
//# sourceMappingURL=FontNamePicker.js.map