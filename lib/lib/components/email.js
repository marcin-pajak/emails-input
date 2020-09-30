"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEmailHandlers = exports.emailTemplate = exports.EMAIL_CLASSES = void 0;
var sanitize_1 = require("../../utils/sanitize");
var typeGuards_1 = require("../../utils/typeGuards");
var constants_1 = require("../constants");
exports.EMAIL_CLASSES = {
    removeButton: 'Email-remove',
    root: 'Email',
    text: 'Email-text',
};
var removeButton = exports.EMAIL_CLASSES.removeButton, root = exports.EMAIL_CLASSES.root, text = exports.EMAIL_CLASSES.text;
/**
 * Email Component Template
 * @param value
 * @param id
 */
exports.emailTemplate = function (value, id) { return "\n<div class=\"" + constants_1.CLASSES.EMAIL + " " + root + " Email--" + (value.isValid ? 'valid' : 'invalid') + "\" data-id=\"" + id + "\">\n  <span class=\"" + text + "\">\n    " + sanitize_1.sanitize(value.email) + "\n  </span>\n  <button aria-label=\"remove email\" class=\"" + removeButton + "\" data-id=\"" + id + "\" type=\"button\">\n    &times;\n  </button>\n</div>"; };
/**
 * Email Component Event Handlers
 * @param handlers
 */
exports.makeEmailHandlers = function (handlers) {
    var removeByLocalId = handlers.removeByLocalId;
    var handleRemoveClick = function (event) {
        var target = event.target;
        if (!typeGuards_1.isClickedButton(target)) {
            return;
        }
        var id = target.dataset.id;
        if (typeof id !== 'undefined') {
            removeByLocalId(id);
        }
        target.blur();
    };
    return {
        handleRemoveClick: handleRemoveClick,
    };
};
//# sourceMappingURL=email.js.map