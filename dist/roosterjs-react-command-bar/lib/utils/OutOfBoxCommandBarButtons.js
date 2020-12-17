"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfBoxCommandBarButtonMap = exports.OutOfBoxCommandBarButtons = exports.RoosterCommmandBarButtonKeys = exports.RoosterCommandBarStringKeys = exports.RoosterCommandBarButtonRootClassName = exports.RoosterCommandBarIconClassName = void 0;
var Button_1 = require("office-ui-fabric-react/lib/Button");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var React = require("react");
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var OutOfBoxCommandBarButtons_ColorInfo_1 = require("./OutOfBoxCommandBarButtons.ColorInfo");
exports.RoosterCommandBarIconClassName = "rooster-command-bar-icon";
exports.RoosterCommandBarButtonRootClassName = "rooster-command-button-root";
exports.RoosterCommandBarStringKeys = {
    LinkPrompt: "linkPrompt"
};
exports.RoosterCommmandBarButtonKeys = {
    Header: "header",
    Bold: "bold",
    Italic: "italic",
    Underline: "underline",
    BulletedList: "bulleted-list",
    NumberedList: "numbered-list",
    Link: "link",
    Highlight: "highlight",
    ClearFormat: "clear-format",
    Emoji: "emoji",
    InsertImage: "insert-image",
    Indent: "indent",
    Outdent: "outdent",
    Strikethrough: "strikethrough",
    FontColor: "font-color",
    Unlink: "unlink",
    Code: "code"
};
var RenderOptionsNoCustomCacheKey = null; // buttons that are not menu based don't need custom cache keys
exports.OutOfBoxCommandBarButtons = [
    {
        key: exports.RoosterCommmandBarButtonKeys.Bold,
        name: "Bold",
        iconProps: _getIconProps("Bold"),
        canCheck: true,
        getChecked: function (formatState) { return formatState.isBold; },
        handleChange: function (editor) { return roosterjs_editor_api_1.toggleBold(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Italic,
        name: "Italic",
        iconProps: _getIconProps("Italic"),
        canCheck: true,
        getChecked: function (formatState) { return formatState.isItalic; },
        handleChange: function (editor) { return roosterjs_editor_api_1.toggleItalic(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Underline,
        name: "Underline",
        iconProps: _getIconProps("Underline"),
        canCheck: true,
        getChecked: function (formatState) { return formatState.isUnderline; },
        handleChange: function (editor) { return roosterjs_editor_api_1.toggleUnderline(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.BulletedList,
        name: "Bulleted list",
        iconProps: _getIconProps("BulletedList"),
        onRenderOptions: {
            customCacheKey: RenderOptionsNoCustomCacheKey,
            highContrastAssetName: "BulletedList",
            assets: [{ name: "BulletedListText" }, { name: "BulletedListBullet" }]
        },
        canCheck: true,
        getChecked: function (formatState) { return formatState.isBullet; },
        handleChange: function (editor, props) { return (props.disableListWorkaround ? roosterjs_react_common_1.toggleNonCompatBullet : roosterjs_editor_api_1.toggleBullet)(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.NumberedList,
        name: "Numbered list",
        iconProps: _getIconProps("NumberedList"),
        onRenderOptions: {
            customCacheKey: RenderOptionsNoCustomCacheKey,
            highContrastAssetName: "NumberedList",
            assets: [{ name: "NumberedListText" }, { name: "NumberedListNumber" }]
        },
        canCheck: true,
        getChecked: function (formatState) { return formatState.isNumbering; },
        handleChange: function (editor, props) { return (props.disableListWorkaround ? roosterjs_react_common_1.toggleNonCompatNumbering : roosterjs_editor_api_1.toggleNumbering)(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Highlight,
        name: "Highlight",
        iconProps: _getIconProps("Highlight"),
        onRenderOptions: {
            highContrastAssetName: "FabricTextHighlightComposite",
            assets: [{ name: "FontColorSwatch", className: "highlight-swatch" }, { name: "FabricTextHighlight" }]
        },
        subMenuProps: {
            className: "rooster-command-bar-color-container",
            shouldFocusOnMount: true,
            directionalHint: ContextualMenu_1.DirectionalHint.bottomLeftEdge,
            focusZoneProps: { direction: FocusZone_1.FocusZoneDirection.bidirectional },
            items: OutOfBoxCommandBarButtons_ColorInfo_1.HighlightColorInfoList.map(function (color) {
                return ({
                    className: "rooster-command-bar-color-item",
                    key: color.key,
                    title: color.title,
                    onRender: _colorCellOnRender,
                    data: color,
                    handleChange: _handleChangeForHighlight
                });
            })
        }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.FontColor,
        name: "Font color",
        iconProps: _getIconProps("FontColor"),
        onRenderOptions: { highContrastAssetName: "FontColor", assets: [{ name: "FontColorSwatch", className: "color-swatch" }, { name: "FontColorA" }] },
        subMenuProps: {
            className: "rooster-command-bar-color-container",
            shouldFocusOnMount: true,
            directionalHint: ContextualMenu_1.DirectionalHint.bottomLeftEdge,
            focusZoneProps: { direction: FocusZone_1.FocusZoneDirection.bidirectional },
            items: OutOfBoxCommandBarButtons_ColorInfo_1.FontColorInfoList.map(function (color) {
                return ({
                    className: "rooster-command-bar-color-item",
                    key: color.key,
                    title: color.title,
                    onRender: _colorCellOnRender,
                    data: color,
                    handleChange: _handleChangeForFontColor
                });
            })
        }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Emoji,
        name: "Emoji",
        iconProps: { className: exports.RoosterCommandBarIconClassName + " rooster-emoji" },
        handleChange: function (editor, props) { return props.emojiPlugin.startEmoji(); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Outdent,
        name: "Decrease indent",
        iconProps: _getIconProps("DecreaseIndentLegacy"),
        onRenderOptions: {
            customCacheKey: RenderOptionsNoCustomCacheKey,
            highContrastAssetName: "DecreaseIndentLegacy",
            assets: [{ name: "DecreaseIndentText" }, { name: "DecreaseIndentArrow" }]
        },
        handleChange: function (editor, props) { return (props.disableListWorkaround ? roosterjs_react_common_1.setNonCompatIndentation : roosterjs_editor_api_1.setIndentation)(editor, 1 /* Decrease */); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Indent,
        name: "Increase indent",
        iconProps: _getIconProps("IncreaseIndentLegacy"),
        onRenderOptions: {
            customCacheKey: RenderOptionsNoCustomCacheKey,
            highContrastAssetName: "IncreaseIndentLegacy",
            assets: [{ name: "IncreaseIndentText" }, { name: "IncreaseIndentArrow" }]
        },
        handleChange: function (editor, props) { return (props.disableListWorkaround ? roosterjs_react_common_1.setNonCompatIndentation : roosterjs_editor_api_1.setIndentation)(editor, 0 /* Increase */); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Strikethrough,
        name: "Strikethrough",
        iconProps: _getIconProps("Strikethrough"),
        getChecked: function (formatState) { return formatState.isStrikeThrough; },
        handleChange: function (editor) { return roosterjs_editor_api_1.toggleStrikethrough(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Header,
        name: "Header",
        iconProps: _getIconProps("FontSize"),
        onRenderOptions: { assets: [{ name: "FontSize" }] },
        subMenuProps: {
            shouldFocusOnMount: true,
            directionalHint: ContextualMenu_1.DirectionalHint.bottomLeftEdge,
            items: [
                {
                    key: "header1",
                    name: "Header 1",
                    className: "rooster-command-bar-header1",
                    headerLevel: 1,
                    canCheck: true,
                    getChecked: _getCheckedForHeader,
                    isContextMenuItem: true,
                    handleChange: _handleChangeForHeader,
                    iconProps: null
                },
                {
                    key: "header2",
                    name: "Header 2",
                    className: "rooster-command-bar-header2",
                    headerLevel: 2,
                    canCheck: true,
                    getChecked: _getCheckedForHeader,
                    isContextMenuItem: true,
                    handleChange: _handleChangeForHeader,
                    iconProps: null
                },
                {
                    key: "header3",
                    name: "Header 3",
                    className: "rooster-command-bar-header3",
                    headerLevel: 3,
                    canCheck: true,
                    getChecked: _getCheckedForHeader,
                    isContextMenuItem: true,
                    handleChange: _handleChangeForHeader,
                    iconProps: null
                }
            ]
        }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Code,
        name: "Code",
        iconProps: _getIconProps("Embed"),
        handleChange: function (editor) { return roosterjs_editor_api_1.toggleCodeBlock(editor); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.ClearFormat,
        name: "Clear format",
        iconProps: _getIconProps("ClearFormatting"),
        onRenderOptions: {
            customCacheKey: RenderOptionsNoCustomCacheKey,
            highContrastAssetName: "ClearFormatting",
            assets: [{ name: "ClearFormattingA" }, { name: "ClearFormattingEraser" }]
        },
        handleChange: function (editor, props) { return props.roosterCommandBarPlugin.clearFormat(); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.InsertImage,
        name: "Insert image",
        iconProps: _getIconProps("Photo2"),
        onRenderOptions: { customCacheKey: RenderOptionsNoCustomCacheKey, assets: [{ name: "Photo2Fill" }, { name: "Photo2" }] } // reuse Photo2 as the high contrast icon
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Link,
        name: "Link",
        iconProps: _getIconProps("Link"),
        handleChange: function (editor, props) { return props.roosterCommandBarPlugin.promptForLink(); }
    },
    {
        key: exports.RoosterCommmandBarButtonKeys.Unlink,
        name: "Unlink",
        iconProps: _getIconProps("RemoveLink"),
        onRenderOptions: { customCacheKey: RenderOptionsNoCustomCacheKey, highContrastAssetName: "RemoveLink", assets: [{ name: "RemoveLinkChain" }, { name: "RemoveLinkX" }] },
        getDisabled: function (formatState) { return !formatState.canUnlink; },
        handleChange: function (editor) { return roosterjs_editor_api_1.removeLink(editor); }
    }
];
exports.OutOfBoxCommandBarButtons.forEach(function (button) {
    var asset = { name: button.name };
    button.onRenderOptions = button.onRenderOptions || { customCacheKey: RenderOptionsNoCustomCacheKey, assets: [asset] };
    button.className = exports.RoosterCommandBarButtonRootClassName;
});
exports.OutOfBoxCommandBarButtonMap = exports.OutOfBoxCommandBarButtons.reduce(function (result, item) {
    result[item.key] = item;
    return result;
}, {});
function _getIconProps(iconName) {
    return { className: exports.RoosterCommandBarIconClassName, iconName: iconName };
}
function _getCheckedForHeader(formatState) {
    return formatState.headerLevel === this.headerLevel;
}
function _handleChangeForHeader(editor, props, state) {
    if (state.formatState.headerLevel === this.headerLevel) {
        roosterjs_editor_api_1.toggleHeader(editor, 0);
    }
    else {
        roosterjs_editor_api_1.toggleHeader(editor, this.headerLevel);
    }
}
function _colorCellOnRender(item) {
    var _a = item.data, color = _a.color, cellBorderColor = _a.cellBorderColor;
    return (React.createElement(Button_1.DefaultButton, { className: "rooster-command-bar-color-button", title: item.title, key: item.key, onClick: function (ev) { return item.onClick(ev, item); } },
        cellBorderColor && React.createElement("div", { className: "rooster-command-bar-color-cell-border", style: { borderColor: cellBorderColor } }),
        React.createElement("svg", { className: "rooster-command-bar-color-cell", viewBox: "0 0 30 30", fill: color, focusable: "false" },
            React.createElement("rect", { width: "100%", height: "100%" }))));
}
function _handleChangeForFontColor(editor) {
    var color = this.data.color;
    roosterjs_editor_api_1.setTextColor(editor, color);
}
function _handleChangeForHighlight(editor) {
    var color = this.data.color;
    var selection = editor.getSelection();
    var backwards = false;
    if (!selection.isCollapsed) {
        var range = editor.getDocument().createRange();
        range.setStart(selection.anchorNode, selection.anchorOffset);
        range.setEnd(selection.focusNode, selection.focusOffset);
        backwards = range.collapsed;
    }
    roosterjs_editor_api_1.setBackgroundColor(editor, color);
    if (backwards) {
        selection.collapseToStart();
    }
    else {
        selection.collapseToEnd();
    }
}
//# sourceMappingURL=OutOfBoxCommandBarButtons.js.map