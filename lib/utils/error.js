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
exports.ErrorWithCode = exports.ErrorCodes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["ERR_INVALID_INITIAL_VALUES"] = "ERR_INVALID_INITIAL_VALUES";
    ErrorCodes["ERR_INVALID_ON_CHANGE_CALLBACK"] = "ERR_INVALID_ON_CHANGE_CALLBACK";
    ErrorCodes["ERR_EMAIL_NOT_FOUND"] = "ERR_EMAIL_NOT_FOUND";
    ErrorCodes["ERR_INVALID_ACTION"] = "ERR_INVALID_ACTION";
    ErrorCodes["ERR_COULD_NOT_INITIALIZE"] = "ERR_COULD_NOT_INITIALIZE";
    ErrorCodes["ERR_INTERNAL"] = "ERR_INTERNAL";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
/**
 * Custom Error with code
 */
var ErrorWithCode = /** @class */ (function (_super) {
    __extends(ErrorWithCode, _super);
    function ErrorWithCode(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return ErrorWithCode;
}(Error));
exports.ErrorWithCode = ErrorWithCode;
//# sourceMappingURL=error.js.map