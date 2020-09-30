"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.includes = exports.remove = void 0;
exports.remove = function (node) {
    if (node === undefined || node === null) {
        return;
    }
    if ('remove' in Element.prototype) {
        node.remove();
    }
    else if (node.parentNode !== null) {
        // eslint-disable-next-line unicorn/prefer-node-remove
        node.parentNode.removeChild(node);
    }
};
exports.includes = function (array, item) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/prefer-includes, unicorn/prefer-includes,
    return array.indexOf(item) !== -1;
};
//# sourceMappingURL=ie11.js.map