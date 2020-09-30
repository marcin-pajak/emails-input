"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryState = exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType["Add"] = "ADD";
    ActionType["Remove"] = "REMOVE";
    ActionType["Initialize"] = "INITIALIZE";
    ActionType["Destroy"] = "DESTROY";
    ActionType["UpdateState"] = "UPDATE_STATE";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var LibraryState;
(function (LibraryState) {
    LibraryState["Initializing"] = "Initializing";
    LibraryState["Initialized"] = "Initialized";
    LibraryState["Destroyed"] = "Destroyed";
})(LibraryState = exports.LibraryState || (exports.LibraryState = {}));
//# sourceMappingURL=constants.js.map