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
// Note: keep the dependencies for this generic component at a minimal (e.g. don't import OfficeFabric)
var React = require("react");
var roosterjs_editor_dom_1 = require("roosterjs-editor-dom");
var roosterjs_react_common_1 = require("roosterjs-react-common");
var FocusOutShell = /** @class */ (function (_super) {
    __extends(FocusOutShell, _super);
    function FocusOutShell(props) {
        var _this = _super.call(this, props) || this;
        _this._calloutClassName = FocusOutShell.CalloutClassName + "-" + FocusOutShell.NextId++;
        _this._calloutOnDismiss = function (ev) {
            // command bar can trigger dismiss event w/o an event object for submenu (when
            // button is clicked again to hide submenu)
            if (!ev) {
                return;
            }
            // For Callout component, target is the event object from the document.body focus event
            var nextTarget = ev.target;
            if (_this._shouldCallBlur(nextTarget)) {
                // delay so callout dismiss can complete
                requestAnimationFrame(function () {
                    var _a = _this.props.onBlur, onBlur = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
                    onBlur(ev);
                    _this.setState({ isFocused: false });
                });
            }
        };
        _this._onBlur = function (ev) {
            // relatedTarget is the event object from the blur event, so it is the next focused element
            var nextTarget = ev.relatedTarget;
            if (_this._shouldCallBlur(nextTarget)) {
                var _a = _this.props.onBlur, onBlur = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
                onBlur(ev);
                _this.setState({ isFocused: false });
            }
        };
        _this._shouldCallBlurDefault = function (nextTarget) {
            // don't call blur if the next target is an element on this container
            if (nextTarget && _this._containerDiv.contains(nextTarget)) {
                return false;
            }
            // similarly, don't call blur if the next target is the callout or its children
            if (nextTarget == null && roosterjs_editor_dom_1.Browser.isIE) {
                nextTarget = document.activeElement;
            }
            if (nextTarget && roosterjs_react_common_1.closest(nextTarget, "." + _this._calloutClassName)) {
                return false;
            }
            return true;
        };
        _this._onFocus = function (ev) {
            if (!_this.state.isFocused) {
                var _a = _this.props.onFocus, onFocus = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
                onFocus(ev);
            }
        };
        // React onFocus isn't reliable, hook into native version instead
        _this._onFocusNative = function (ev) {
            _this.setState({ isFocused: true });
        };
        _this._onMouseDown = function (ev) {
            var _a = _this.props.allowMouseDown, allowMouseDown = _a === void 0 ? roosterjs_react_common_1.NullFunction : _a;
            var target = ev.target;
            if (allowMouseDown(target)) {
                return;
            }
            ev.preventDefault(); // prevents blur event from triggering
        };
        _this._containerDivOnRef = function (ref) {
            _this._containerDiv = ref;
            var eventName = "focusin";
            if (_this._containerDiv) {
                _this._containerDiv.removeEventListener(eventName, _this._onFocusNative);
            }
            if (ref) {
                ref.addEventListener(eventName, _this._onFocusNative);
            }
        };
        _this.state = { isFocused: false };
        return _this;
    }
    FocusOutShell.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children;
        return (React.createElement("div", { className: roosterjs_react_common_1.css(FocusOutShell.BaseClassName, className, { "is-focused": this.state.isFocused }), ref: this._containerDivOnRef, onBlur: this._onBlur, onFocus: this._onFocus, onMouseDown: this._onMouseDown }, children(this._calloutClassName, this._calloutOnDismiss)));
    };
    FocusOutShell.prototype._shouldCallBlur = function (nextTarget) {
        var _a = this.props.shouldCallBlur, shouldCallBlur = _a === void 0 ? this._shouldCallBlurDefault : _a;
        return shouldCallBlur(nextTarget, this._shouldCallBlurDefault);
    };
    FocusOutShell.BaseClassName = "focus-out-shell";
    FocusOutShell.CalloutClassName = FocusOutShell.BaseClassName + "-callout";
    FocusOutShell.NextId = 0;
    return FocusOutShell;
}(React.PureComponent));
exports.default = FocusOutShell;
//# sourceMappingURL=FocusOutShell.js.map