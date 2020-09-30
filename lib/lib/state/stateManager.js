"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateManager = void 0;
var isValidEmail_1 = require("../../utils/isValidEmail");
var object_1 = require("../../utils/object");
var actions_1 = require("./actions");
var constants_1 = require("./constants");
/**
 * Library's State Manipulation
 */
exports.stateManager = function () {
    var id = {
        current: 1,
    };
    /**
     * Return new state
     * @param initialValue
     */
    var makeState = function (initialValue) {
        var mapper = {};
        var entryMap = initialValue.reduce(function (map, email) {
            var newId = String(id.current);
            map[newId] = {
                email: email,
                isValid: isValidEmail_1.isValidEmail(email),
            };
            mapper[email] = newId;
            id.current++;
            return map;
        }, {});
        return {
            emails: initialValue,
            entries: object_1.objectValues(entryMap),
            entryMap: entryMap,
            mapper: mapper,
            state: constants_1.LibraryState.Initializing,
        };
    };
    /**
     * Process action
     * @param action
     * @param state
     */
    var handleAction = function (action, state) {
        switch (action.type) {
            case constants_1.ActionType.Add: {
                var newId = String(id.current);
                actions_1.handleAddAction(action, state, newId);
                id.current++;
                return newId;
            }
            case constants_1.ActionType.Remove: {
                actions_1.handleRemoveAction(action, state);
                return undefined;
            }
            case constants_1.ActionType.UpdateState: {
                actions_1.handleUpdateAction(action, state);
                return undefined;
            }
            default: {
                return undefined;
            }
        }
    };
    return {
        handleAction: handleAction,
        makeState: makeState,
    };
};
//# sourceMappingURL=stateManager.js.map