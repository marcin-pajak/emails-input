"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateAction = exports.handleAddAction = exports.handleRemoveAction = void 0;
var isValidEmail_1 = require("../../utils/isValidEmail");
/**
 * Remove email
 * @param action
 * @param state
 */
exports.handleRemoveAction = function (action, state) {
    var name = state.entryMap[action.payload].email;
    var index = state.emails.indexOf(name);
    delete state.entryMap[action.payload];
    delete state.mapper[name];
    state.entries.splice(index, 1);
    state.emails.splice(index, 1);
};
/**
 * Add email
 * Returns local Id of new email
 * @param action
 * @param state
 * @param newId
 */
exports.handleAddAction = function (action, state, newId) {
    var entry = {
        email: action.payload,
        isValid: isValidEmail_1.isValidEmail(action.payload),
    };
    state.emails.push(action.payload);
    state.mapper[action.payload] = newId;
    state.entryMap[newId] = entry;
    state.entries.push(entry);
};
/**
 * Update Library state
 * @param action
 * @param state
 */
exports.handleUpdateAction = function (action, state) {
    state.state = action.payload;
};
//# sourceMappingURL=actions.js.map