"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInputHandlers = exports.inputTemplate = exports.MIN_LENGTH = void 0;
var error_1 = require("../../utils/error");
var constants_1 = require("../constants");
exports.MIN_LENGTH = 21;
/**
 * Input Component Template
 */
exports.inputTemplate = function () {
    return "<input\n    aria-label=\"add more people\"\n    class=\"" + constants_1.CLASSES.INPUT + "\"\n    max-length=\"255\"\n    placeholder=\"add more people...\"\n  />";
};
/**
 * Input Component Event Handlers
 * @param elements
 * @param handlers
 */
exports.makeInputHandlers = function (elements, handlers) {
    var add = handlers.add;
    /**
     * Return input element
     */
    var getInput = function () {
        var input = elements.input;
        if (input === null) {
            throw new error_1.ErrorWithCode('Library is in wrong state.', error_1.ErrorCodes.ERR_INTERNAL);
        }
        return input;
    };
    /**
     * Add email on enter and comma
     * @param event
     */
    var handleInputChange = function (event) {
        var input = getInput();
        var key = event.key;
        var trimmed = input.value.trim();
        if (trimmed === '')
            return;
        var inputWidth = Math.max(input.value.length + 1, exports.MIN_LENGTH);
        input.style.minWidth = String(inputWidth) + "ch";
        if (key === 'Enter') {
            add(input.value);
            input.value = '';
        }
        else if (key === ',' && input.value.length > 1) {
            add(input.value.slice(0, Math.max(0, input.value.length - 1)));
            input.value = '';
        }
    };
    /**
     * Add email on paste
     * @param event
     */
    var handleInputPaste = function (event) {
        var _a, _b;
        event.preventDefault();
        event.stopImmediatePropagation();
        var input = getInput();
        var pastedText = (_b = ((_a = event.clipboardData) !== null && _a !== void 0 ? _a : window.clipboardData)) === null || _b === void 0 ? void 0 : _b.getData('text').trim();
        if (pastedText !== '' && pastedText !== undefined) {
            add(pastedText);
            input.value = '';
        }
        return false;
    };
    /**
     * Add email on blur
     */
    var handleInputBlur = function () {
        var input = getInput();
        var trimmedValue = input.value.trim();
        if (trimmedValue !== '') {
            add(trimmedValue);
            input.value = '';
        }
    };
    return {
        handleInputBlur: handleInputBlur,
        handleInputChange: handleInputChange,
        handleInputPaste: handleInputPaste,
    };
};
//# sourceMappingURL=input.js.map