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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkDialog = exports.InsertLinkStringKeys = void 0;
var Styles = require("./LinkDialog.scss.g");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var TextField_1 = require("office-ui-fabric-react/lib/TextField");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var React = require("react");
var ReactDOM = require("react-dom");
var roosterjs_editor_api_1 = require("roosterjs-editor-api");
var roosterjs_react_common_1 = require("roosterjs-react-common");
exports.InsertLinkStringKeys = {
    LinkFieldLabel: "linkFieldLabel",
    Title: "linkPromptTitle",
    InsertButton: "insertLinkText",
    CancelButton: "cancelLinkText"
};
var LinkDialog = /** @class */ (function (_super) {
    __extends(LinkDialog, _super);
    function LinkDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.onLinkFieldRef = function (ref) {
            _this.linkField = ref;
        };
        _this.onLinkFieldChanged = function (_e, newValue) {
            _this.setState({ insertButtonDisabled: newValue.trim().length === 0 });
        };
        _this.onLinkFieldKeyDown = function (ev) {
            if (ev.which === Utilities_1.KeyCodes.enter) {
                _this.insertLink();
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        _this.insertLink = function () {
            var _a = _this.props, editor = _a.editor, selectionRange = _a.selectionRange;
            if (!_this.linkField || !editor || editor.isDisposed()) {
                return;
            }
            editor && !editor.isDisposed() && editor.select(selectionRange);
            _this.linkInserted = true; // don't need to restore the selection after dismiss if we're changing selection into a link
            roosterjs_editor_api_1.createLink(editor, _this.linkField.value);
            _this.dismissDialog();
        };
        _this.dismissDialog = function (ev) {
            var _a = _this.props, editor = _a.editor, _b = _a.onDismiss, onDismiss = _b === void 0 ? roosterjs_react_common_1.NullFunction : _b, selectionRange = _a.selectionRange;
            onDismiss(ev);
            !_this.linkInserted && editor && !editor.isDisposed() && editor.select(selectionRange);
        };
        _this.state = { insertButtonDisabled: true };
        return _this;
    }
    LinkDialog.prototype.render = function () {
        var _a = this.props, _b = _a.strings, strings = _b === void 0 ? {} : _b, className = _a.className;
        return (React.createElement(Dialog_1.Dialog, { onDismiss: this.dismissDialog, dialogContentProps: { type: Dialog_1.DialogType.normal, title: strings[exports.InsertLinkStringKeys.Title] }, hidden: false, modalProps: { isBlocking: true }, className: Utilities_1.css(Styles.modal, className) },
            React.createElement(TextField_1.TextField, { label: strings[exports.InsertLinkStringKeys.LinkFieldLabel] || "Link", componentRef: this.onLinkFieldRef, onKeyDown: this.onLinkFieldKeyDown, required: true, onChange: this.onLinkFieldChanged }),
            React.createElement(Dialog_1.DialogFooter, null,
                React.createElement(Button_1.PrimaryButton, { onClick: this.insertLink, text: strings[exports.InsertLinkStringKeys.InsertButton] || "Insert", disabled: this.state.insertButtonDisabled }),
                React.createElement(Button_1.DefaultButton, { onClick: this.dismissDialog, text: strings[exports.InsertLinkStringKeys.CancelButton] || "Cancel" }))));
    };
    LinkDialog.prototype.componentDidMount = function () {
        this.linkField && this.linkField.focus();
    };
    return LinkDialog;
}(React.PureComponent));
function createLinkDialog(doc, props, calloutClassName) {
    var editor = props.editor, onDismiss = props.onDismiss;
    var container = doc.createElement("div");
    doc.body.appendChild(container);
    var dispose = function () {
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            // hack to clear placeholder and also for Firefox, to get cursor visible again
            container.setAttribute("tabindex", "0");
            calloutClassName && container.setAttribute("class", calloutClassName);
            container.focus();
            editor && !editor.isDisposed() && editor.focus();
            container.parentElement.removeChild(container);
            container = null;
        }
    };
    // for the case that selection isn't tracked, we need to save the selection before bringing up the dialog
    // and from there, we need to restore it before converting the selected text into a link or restore
    // the selection if the dialog was cancelled
    var selectionRange = editor && !editor.isDisposed() ? editor.getSelectionRange() : null;
    ReactDOM.render(React.createElement(LinkDialog, __assign({}, props, { selectionRange: selectionRange, onDismiss: function (ev) {
            dispose();
            onDismiss && onDismiss(ev);
        }, className: Utilities_1.css(calloutClassName, props.className) })), container);
    return dispose;
}
exports.createLinkDialog = createLinkDialog;
//# sourceMappingURL=LinkDialog.js.map