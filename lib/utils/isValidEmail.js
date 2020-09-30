"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = void 0;
/**
 * Validate email
 * @param value
 */
exports.isValidEmail = function (value) {
    return /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,20}$/i.test(value);
};
//# sourceMappingURL=isValidEmail.js.map