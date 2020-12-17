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
var ReactDOM = require("react-dom");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var dialogStrings_1 = require("../strings/dialogStrings");
var Styles = require("./ConfirmDialog.scss.g");
var ConfirmDialog = /** @class */ (function (_super) {
    __extends(ConfirmDialog, _super);
    function ConfirmDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = function (callback) {
            _this.delayedCallback = callback;
            _this.setState({
                isShown: false,
                value: _this.state.value,
            });
        };
        _this.onDismissed = function () {
            if (_this.delayedCallback) {
                _this.delayedCallback(_this.state.value);
                _this.delayedCallback = null;
            }
            _this.props.onClose();
        };
        _this.state = {
            isShown: true,
            value: _this.props.initialValue || '',
        };
        return _this;
    }
    ConfirmDialog.prototype.render = function () {
        var _this = this;
        var onOk = function () { return _this.onClick(_this.props.onOkCallback); };
        var onCancel = function () { return _this.onClick(null); };
        var strings = this.props.strings;
        return (React.createElement(Dialog_1.Dialog, { className: this.props.className, isOpen: this.state.isShown, onDismissed: this.onDismissed, title: this.props.title },
            React.createElement("form", { onSubmit: function (evt) {
                    evt.preventDefault();
                    onOk();
                } },
                React.createElement("div", { className: Styles.dialogContent },
                    React.createElement("label", { className: Styles.dialogLabel },
                        this.props.subText,
                        React.createElement("input", { role: "textbox", type: "text", ref: function (ref) { return (_this.input = ref); }, onChange: function () {
                                return _this.setState({
                                    isShown: _this.state.isShown,
                                    value: _this.input.value,
                                });
                            }, value: this.state.value, className: Styles.dialogInput })))),
            React.createElement(Dialog_1.DialogFooter, null,
                React.createElement(Button_1.Button, { buttonType: Button_1.ButtonType.primary, onClick: onOk }, dialogStrings_1.getString('dlgOk', strings)),
                React.createElement(Button_1.Button, { buttonType: Button_1.ButtonType.normal, onClick: onCancel }, dialogStrings_1.getString('dlgCancel', strings)))));
    };
    ConfirmDialog.prototype.componentDidMount = function () {
        if (this.input) {
            this.input.focus();
        }
    };
    return ConfirmDialog;
}(React.Component));
function confirm(title, subText, initialValue, strings, className) {
    return new Promise(function (resolve, reject) {
        var confirmDialogDiv = document.createElement('div');
        document.body.appendChild(confirmDialogDiv);
        ReactDOM.render(React.createElement(ConfirmDialog, { className: className, title: title, subText: subText, onOkCallback: function (value) { return resolve(value); }, initialValue: initialValue, strings: strings, onClose: function (ev) {
                ReactDOM.unmountComponentAtNode(confirmDialogDiv);
                document.body.removeChild(confirmDialogDiv);
                reject();
            } }), confirmDialogDiv);
    });
}
exports.default = confirm;
//# sourceMappingURL=ConfirmDialog.js.map