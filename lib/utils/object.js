"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectEntries = exports.objectValues = void 0;
/**
 * Get object values
 * Object values is not available in IE11
 * @param object
 */
exports.objectValues = function (instance) {
    return Object.keys(instance).map(function (key) { return instance[key]; });
};
/**
 * Get object entries
 * Object entries is not available in IE11
 * @param object
 */
exports.objectEntries = function (instance) {
    return Object.keys(instance).map(function (key) { return [
        key,
        instance[key],
    ]; });
};
//# sourceMappingURL=object.js.map