"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMultiple = exports.isClickedButton = void 0;
/**
 * Verify if clicked element is a button
 * @param node
 */
exports.isClickedButton = function (node) {
    return Boolean(node.type === 'button');
};
/**
 * Verify if value is an array of emails
 * @param value
 */
exports.isMultiple = function (value) {
    return Array.isArray(value);
};
//# sourceMappingURL=typeGuards.js.map