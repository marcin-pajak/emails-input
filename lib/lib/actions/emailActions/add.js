"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddItemActions = void 0;
var ie11_1 = require("../../../utils/ie11");
var render_1 = require("../../../utils/render");
var typeGuards_1 = require("../../../utils/typeGuards");
var email_1 = require("../../components/email");
var constants_1 = require("../../constants");
var actionCreators_1 = require("../../state/actionCreators");
/**
 * Add Email Actions
 * @param EmailActionsProperties
 */
exports.makeAddItemActions = function (_a) {
    var elements = _a.elements, handleAction = _a.handleAction, options = _a.options, state = _a.state;
    /**
     * Add unique email
     * Returns true when email was added successfully and false when not.
     * @param rawValue
     * @private
     */
    var addSingle = function (rawValue) {
        var value = rawValue.trim();
        if (value === '' || ie11_1.includes(state.emails, value)) {
            return false;
        }
        // Update state
        var newEntryId = handleAction(actionCreators_1.addItemAction(value));
        // Update UI
        if (typeof newEntryId === 'string' && elements.wrapper !== null) {
            var entry = state.entryMap[newEntryId];
            if (typeof entry !== 'undefined') {
                var emailNode = render_1.makeElementFromHTML(email_1.emailTemplate(entry, newEntryId));
                elements.wrapper.insertBefore(emailNode, elements.input);
            }
        }
        // Notify listeners
        options.onChange(value, constants_1.ChangeType.Added, state.emails);
        return true;
    };
    /**
     * Adds multiple unique emails.
     * Returns true when all emails were added successfully and false when not.
     * @param value
     * @private
     */
    var addMultiple = function (value) {
        var results = value.map(function (email) { return addSingle(email); });
        return !results.some(function (isSuccess) { return !isSuccess; });
    };
    /**
     * Add unique emails in any format.
     * Returns true when added successfully and false when not.
     *
     * Accepts:
     * - array of single emails
     * - string with single email
     * - string with multiple, comma separated emails
     *
     * Examples of @param value:
     * ["email@email.com", "email2@email.com"]
     * "email@email.com, email2@email.com"
     * "email@email.com"
     *
     * @param value
     * @public
     */
    var add = function (value) {
        // Array of emails
        if (typeGuards_1.isMultiple(value)) {
            return addMultiple(value);
        }
        // Split if value contains multiple, comma separated emails
        var values = value.split(',');
        return addMultiple(values);
    };
    return {
        add: add,
    };
};
//# sourceMappingURL=add.js.map