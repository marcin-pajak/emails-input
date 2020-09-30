"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeElementFromHTML = exports.render = void 0;
/**
 * Render Component
 * @param template
 * @param element
 */
exports.render = function (template, element) {
    element.innerHTML += template.trim();
};
/**
 * Make DOM Node from template
 * @param template
 */
exports.makeElementFromHTML = function (template) {
    var div = document.createElement('div');
    exports.render(template, div);
    return div.firstChild;
};
//# sourceMappingURL=render.js.map