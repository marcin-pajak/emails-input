"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRemoveItemActions = void 0;
var error_1 = require("../../../utils/error");
var ie11_1 = require("../../../utils/ie11");
var constants_1 = require("../../constants");
var actionCreators_1 = require("../../state/actionCreators");
/**
 * Throw if not valid payload
 * @param id
 */
var validateEmail = function (id) {
    if (typeof id === 'undefined') {
        throw new error_1.ErrorWithCode('Invalid value.', error_1.ErrorCodes.ERR_EMAIL_NOT_FOUND);
    }
};
/**
 * Remove Email Actions
 * @param ItemActionsProperties
 */
exports.makeRemoveItemActions = function (_a) {
    var elements = _a.elements, handleAction = _a.handleAction, options = _a.options, state = _a.state;
    /**
     * Remove item
     * @param localId
     * @private
     */
    var remove = function (localId) {
        var _a;
        var email = state.entryMap[localId].email;
        // Update state
        handleAction(actionCreators_1.removeItemAction(localId));
        // Update UI
        var node = (_a = elements.wrapper) === null || _a === void 0 ? void 0 : _a.querySelector("div[data-id=\"" + localId + "\"");
        ie11_1.remove(node);
        // Notify listeners
        options.onChange(email, constants_1.ChangeType.Removed, state.emails);
    };
    /**
     * Remove item by it's internal id
     * @param id
     * @private
     */
    var removeByLocalId = function (localId) {
        if (typeof state.entryMap[localId] === 'undefined') {
            throw new error_1.ErrorWithCode('Invalid id.', error_1.ErrorCodes.ERR_EMAIL_NOT_FOUND);
        }
        else {
            remove(localId);
        }
    };
    /**
     * Remove item by index
     * @param index
     * @public
     */
    var removeByIndex = function (index) {
        var name = state.emails[index];
        var id = state.mapper[name];
        validateEmail(id);
        remove(id);
    };
    /**
     * Remove item by name
     * @param name
     * @public
     */
    var removeByName = function (name) {
        var id = state.mapper[name];
        validateEmail(id);
        remove(id);
    };
    return {
        removeByIndex: removeByIndex,
        removeByLocalId: removeByLocalId,
        removeByName: removeByName,
    };
};
//# sourceMappingURL=remove.js.map