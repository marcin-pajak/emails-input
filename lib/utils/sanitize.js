"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
/**
 * Sanitizes rendered HTML
 * @param value
 */
exports.sanitize = function (value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;');
};
//# sourceMappingURL=sanitize.js.map