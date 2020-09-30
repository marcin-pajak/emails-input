"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeItemActions = void 0;
var add_1 = require("./add");
var remove_1 = require("./remove");
/**
 * Actions to add and remove emails
 * @param properties
 */
exports.makeItemActions = function (properties) { return (__assign(__assign({}, add_1.makeAddItemActions(properties)), remove_1.makeRemoveItemActions(properties))); };
//# sourceMappingURL=index.js.map