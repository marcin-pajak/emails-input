"use strict";
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
exports.makeOptions = exports.validateOptions = void 0;
var error_1 = require("../../utils/error");
/**
 * Validate options
 * @param options
 * @private
 */
exports.validateOptions = function (options) {
    var initialValue = options.initialValue, onChange = options.onChange;
    if (initialValue !== undefined && !Array.isArray(initialValue)) {
        throw new error_1.ErrorWithCode('Initial values must be an array.', error_1.ErrorCodes.ERR_INVALID_INITIAL_VALUES);
    }
    if (onChange !== undefined && typeof onChange !== 'function') {
        throw new error_1.ErrorWithCode('onChange callback is not a function.', error_1.ErrorCodes.ERR_INVALID_ON_CHANGE_CALLBACK);
    }
};
/**
 * Merge user options with default options
 * @param userOptions
 * @private
 */
exports.makeOptions = function (userOptions) { return (__assign({ initialValue: [], onChange: function () { } }, userOptions)); };
//# sourceMappingURL=index.js.map