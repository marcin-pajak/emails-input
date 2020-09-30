"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStateAction = exports.removeItemAction = exports.addItemAction = void 0;
var constants_1 = require("./constants");
/**
 * Add new email
 * @param email
 */
exports.addItemAction = function (email) { return ({
    payload: email,
    type: constants_1.ActionType.Add,
}); };
/**
 * Remove email
 * @param id
 */
exports.removeItemAction = function (id) { return ({
    payload: id,
    type: constants_1.ActionType.Remove,
}); };
/**
 * Update Library's state
 * @param state
 */
exports.updateStateAction = function (state) { return ({
    payload: state,
    type: constants_1.ActionType.UpdateState,
}); };
//# sourceMappingURL=actionCreators.js.map