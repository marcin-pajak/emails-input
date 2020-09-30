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
require("./styles.scss");
var emailActions_1 = require("./lib/actions/emailActions");
var libraryActions_1 = require("./lib/actions/libraryActions");
var email_1 = require("./lib/components/email");
var input_1 = require("./lib/components/input");
var options_1 = require("./lib/options");
var stateManager_1 = require("./lib/state/stateManager");
/**
 * Emails Input Library
 * @param element
 * @param userOptions
 */
var EmailsInput = function (element, userOptions) {
    // Merge and validate options
    var options = options_1.makeOptions(userOptions);
    options_1.validateOptions(options);
    // Init State
    var _a = stateManager_1.stateManager(), makeState = _a.makeState, handleAction = _a.handleAction;
    var state = makeState(options.initialValue);
    var dispatch = function (action) {
        return handleAction(action, state);
    };
    // DOM Nodes
    var elements = {
        container: element,
        input: null,
        wrapper: null,
    };
    // Email Actions
    var itemActions = emailActions_1.makeItemActions({
        elements: elements,
        handleAction: dispatch,
        options: options,
        state: state,
    });
    // Event Handlers
    var handlers = __assign(__assign({}, input_1.makeInputHandlers(elements, itemActions)), email_1.makeEmailHandlers(itemActions));
    // Library Actions
    var libraryActions = libraryActions_1.makeLibraryActions({
        elements: elements,
        handleAction: dispatch,
        handlers: handlers,
        state: state,
    });
    // Initialize library
    libraryActions.init();
    /**
     * Library's Public API
     *
     * State:
     * - emails
     * - entries
     *
     * Library Methods:
     * - init
     * - destroy
     *
     * Email methods:
     * - add
     * - removeByIndex
     * - removeByName
     *
     */
    return {
        add: itemActions.add,
        destroy: libraryActions.destroy,
        emails: state.emails,
        entries: state.entries,
        init: libraryActions.init,
        removeByIndex: itemActions.removeByIndex,
        removeByName: itemActions.removeByName,
    };
};
exports.default = EmailsInput;
//# sourceMappingURL=index.js.map