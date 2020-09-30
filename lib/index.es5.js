/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

var remove = function (node) {
    if (node === undefined || node === null) {
        return;
    }
    if ('remove' in Element.prototype) {
        node.remove();
    }
    else if (node.parentNode !== null) {
        // eslint-disable-next-line unicorn/prefer-node-remove
        node.parentNode.removeChild(node);
    }
};
var includes = function (array, item) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/prefer-includes, unicorn/prefer-includes,
    return array.indexOf(item) !== -1;
};

/**
 * Render Component
 * @param template
 * @param element
 */
var render = function (template, element) {
    element.innerHTML += template.trim();
};
/**
 * Make DOM Node from template
 * @param template
 */
var makeElementFromHTML = function (template) {
    var div = document.createElement('div');
    render(template, div);
    return div.firstChild;
};

/**
 * Verify if clicked element is a button
 * @param node
 */
var isClickedButton = function (node) {
    return Boolean(node.type === 'button');
};
/**
 * Verify if value is an array of emails
 * @param value
 */
var isMultiple = function (value) {
    return Array.isArray(value);
};

/**
 * Sanitizes rendered HTML
 * @param value
 */
var sanitize = function (value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/"/g, '&quot;');
};

var ChangeType;
(function (ChangeType) {
    ChangeType["Added"] = "Added";
    ChangeType["Removed"] = "Removed";
})(ChangeType || (ChangeType = {}));
var CLASSES = {
    CONTAINER: 'EmailsInputWrapper',
    EMAIL: 'EmailsInput-email',
    INPUT: 'EmailsInput-input',
    WRAPPER: 'EmailsInput',
};

var EMAIL_CLASSES = {
    removeButton: 'Email-remove',
    root: 'Email',
    text: 'Email-text',
};
var removeButton = EMAIL_CLASSES.removeButton, root = EMAIL_CLASSES.root, text = EMAIL_CLASSES.text;
/**
 * Email Component Template
 * @param value
 * @param id
 */
var emailTemplate = function (value, id) { return "\n<div class=\"" + CLASSES.EMAIL + " " + root + " Email--" + (value.isValid ? 'valid' : 'invalid') + "\" data-id=\"" + id + "\">\n  <span class=\"" + text + "\">\n    " + sanitize(value.email) + "\n  </span>\n  <button aria-label=\"remove email\" class=\"" + removeButton + "\" data-id=\"" + id + "\" type=\"button\">\n    &times;\n  </button>\n</div>"; };
/**
 * Email Component Event Handlers
 * @param handlers
 */
var makeEmailHandlers = function (handlers) {
    var removeByLocalId = handlers.removeByLocalId;
    var handleRemoveClick = function (event) {
        var target = event.target;
        if (!isClickedButton(target)) {
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

var ActionType;
(function (ActionType) {
    ActionType["Add"] = "ADD";
    ActionType["Remove"] = "REMOVE";
    ActionType["Initialize"] = "INITIALIZE";
    ActionType["Destroy"] = "DESTROY";
    ActionType["UpdateState"] = "UPDATE_STATE";
})(ActionType || (ActionType = {}));
var LibraryState;
(function (LibraryState) {
    LibraryState["Initializing"] = "Initializing";
    LibraryState["Initialized"] = "Initialized";
    LibraryState["Destroyed"] = "Destroyed";
})(LibraryState || (LibraryState = {}));

/**
 * Add new email
 * @param email
 */
var addItemAction = function (email) { return ({
    payload: email,
    type: ActionType.Add,
}); };
/**
 * Remove email
 * @param id
 */
var removeItemAction = function (id) { return ({
    payload: id,
    type: ActionType.Remove,
}); };
/**
 * Update Library's state
 * @param state
 */
var updateStateAction = function (state) { return ({
    payload: state,
    type: ActionType.UpdateState,
}); };

/**
 * Add Email Actions
 * @param EmailActionsProperties
 */
var makeAddItemActions = function (_a) {
    var elements = _a.elements, handleAction = _a.handleAction, options = _a.options, state = _a.state;
    /**
     * Add unique email
     * Returns true when email was added successfully and false when not.
     * @param rawValue
     * @private
     */
    var addSingle = function (rawValue) {
        var value = rawValue.trim();
        if (value === '' || includes(state.emails, value)) {
            return false;
        }
        // Update state
        var newEntryId = handleAction(addItemAction(value));
        // Update UI
        if (typeof newEntryId === 'string' && elements.wrapper !== null) {
            var entry = state.entryMap[newEntryId];
            if (typeof entry !== 'undefined') {
                var emailNode = makeElementFromHTML(emailTemplate(entry, newEntryId));
                elements.wrapper.insertBefore(emailNode, elements.input);
            }
        }
        // Notify listeners
        options.onChange(value, ChangeType.Added, state.emails);
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
        if (isMultiple(value)) {
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

var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["ERR_INVALID_INITIAL_VALUES"] = "ERR_INVALID_INITIAL_VALUES";
    ErrorCodes["ERR_INVALID_ON_CHANGE_CALLBACK"] = "ERR_INVALID_ON_CHANGE_CALLBACK";
    ErrorCodes["ERR_EMAIL_NOT_FOUND"] = "ERR_EMAIL_NOT_FOUND";
    ErrorCodes["ERR_INVALID_ACTION"] = "ERR_INVALID_ACTION";
    ErrorCodes["ERR_COULD_NOT_INITIALIZE"] = "ERR_COULD_NOT_INITIALIZE";
    ErrorCodes["ERR_INTERNAL"] = "ERR_INTERNAL";
})(ErrorCodes || (ErrorCodes = {}));
/**
 * Custom Error with code
 */
var ErrorWithCode = /** @class */ (function (_super) {
    __extends(ErrorWithCode, _super);
    function ErrorWithCode(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return ErrorWithCode;
}(Error));

/**
 * Throw if not valid payload
 * @param id
 */
var validateEmail = function (id) {
    if (typeof id === 'undefined') {
        throw new ErrorWithCode('Invalid value.', ErrorCodes.ERR_EMAIL_NOT_FOUND);
    }
};
/**
 * Remove Email Actions
 * @param ItemActionsProperties
 */
var makeRemoveItemActions = function (_a) {
    var elements = _a.elements, handleAction = _a.handleAction, options = _a.options, state = _a.state;
    /**
     * Remove item
     * @param localId
     * @private
     */
    var remove$$1 = function (localId) {
        var _a;
        var email = state.entryMap[localId].email;
        // Update state
        handleAction(removeItemAction(localId));
        // Update UI
        var node = (_a = elements.wrapper) === null || _a === void 0 ? void 0 : _a.querySelector("div[data-id=\"" + localId + "\"");
        remove(node);
        // Notify listeners
        options.onChange(email, ChangeType.Removed, state.emails);
    };
    /**
     * Remove item by it's internal id
     * @param id
     * @private
     */
    var removeByLocalId = function (localId) {
        if (typeof state.entryMap[localId] === 'undefined') {
            throw new ErrorWithCode('Invalid id.', ErrorCodes.ERR_EMAIL_NOT_FOUND);
        }
        else {
            remove$$1(localId);
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
        remove$$1(id);
    };
    /**
     * Remove item by name
     * @param name
     * @public
     */
    var removeByName = function (name) {
        var id = state.mapper[name];
        validateEmail(id);
        remove$$1(id);
    };
    return {
        removeByIndex: removeByIndex,
        removeByLocalId: removeByLocalId,
        removeByName: removeByName,
    };
};

/**
 * Actions to add and remove emails
 * @param properties
 */
var makeItemActions = function (properties) { return (__assign(__assign({}, makeAddItemActions(properties)), makeRemoveItemActions(properties))); };

/**
 * Get object values
 * Object values is not available in IE11
 * @param object
 */
var objectValues = function (instance) {
    return Object.keys(instance).map(function (key) { return instance[key]; });
};
/**
 * Get object entries
 * Object entries is not available in IE11
 * @param object
 */
var objectEntries = function (instance) {
    return Object.keys(instance).map(function (key) { return [
        key,
        instance[key],
    ]; });
};

/**
 * Emails Component Template
 * @param entryMap
 */
var emailsTemplate = function (entryMap) {
    return objectEntries(entryMap)
        .map(function (_a) {
        var _b = __read(_a, 2), localId = _b[0], entry = _b[1];
        return emailTemplate(entry, localId);
    })
        .join('');
};

var MIN_LENGTH = 21;
/**
 * Input Component Template
 */
var inputTemplate = function () {
    return "<input\n    aria-label=\"add more people\"\n    class=\"" + CLASSES.INPUT + "\"\n    max-length=\"255\"\n    placeholder=\"add more people...\"\n  />";
};
/**
 * Input Component Event Handlers
 * @param elements
 * @param handlers
 */
var makeInputHandlers = function (elements, handlers) {
    var add = handlers.add;
    /**
     * Return input element
     */
    var getInput = function () {
        var input = elements.input;
        if (input === null) {
            throw new ErrorWithCode('Library is in wrong state.', ErrorCodes.ERR_INTERNAL);
        }
        return input;
    };
    /**
     * Add email on enter and comma
     * @param event
     */
    var handleInputChange = function (event) {
        var input = getInput();
        var key = event.key;
        var trimmed = input.value.trim();
        if (trimmed === '')
            return;
        var inputWidth = Math.max(input.value.length + 1, MIN_LENGTH);
        input.style.minWidth = String(inputWidth) + "ch";
        if (key === 'Enter') {
            add(input.value);
            input.value = '';
        }
        else if (key === ',' && input.value.length > 1) {
            add(input.value.slice(0, Math.max(0, input.value.length - 1)));
            input.value = '';
        }
    };
    /**
     * Add email on paste
     * @param event
     */
    var handleInputPaste = function (event) {
        var _a, _b;
        event.preventDefault();
        event.stopImmediatePropagation();
        var input = getInput();
        var pastedText = (_b = ((_a = event.clipboardData) !== null && _a !== void 0 ? _a : window.clipboardData)) === null || _b === void 0 ? void 0 : _b.getData('text').trim();
        if (pastedText !== '' && pastedText !== undefined) {
            add(pastedText);
            input.value = '';
        }
        return false;
    };
    /**
     * Add email on blur
     */
    var handleInputBlur = function () {
        var input = getInput();
        var trimmedValue = input.value.trim();
        if (trimmedValue !== '') {
            add(trimmedValue);
            input.value = '';
        }
    };
    return {
        handleInputBlur: handleInputBlur,
        handleInputChange: handleInputChange,
        handleInputPaste: handleInputPaste,
    };
};

/**
 * Root Component Template
 * @param state
 */
var rootTemplate = function (state) { return "\n  <div class=\"" + CLASSES.WRAPPER + "\">\n    " + emailsTemplate(state.entryMap) + "\n    " + inputTemplate() + "\n  </div>\n"; };

/**
 * Public init / destroy actions
 * @param LibraryActionProperties
 */
var makeLibraryActions = function (_a) {
    var elements = _a.elements, handlers = _a.handlers, handleAction = _a.handleAction, state = _a.state;
    // Keep the input always visible
    var mutationHandler = function () {
        if (elements.wrapper !== null) {
            elements.wrapper.scrollTop = elements.wrapper.scrollHeight;
        }
    };
    var observer = new MutationObserver(mutationHandler);
    /**
     * Initialize Library
     * @public
     */
    var init = function () {
        // Validate state
        if (state.state === LibraryState.Initialized) {
            throw new ErrorWithCode('Library already initialized.', ErrorCodes.ERR_INVALID_ACTION);
        }
        // Render UI
        render(rootTemplate(state), elements.container);
        elements.container.classList.add(CLASSES.CONTAINER);
        // Set elements
        elements.input = elements.container.querySelector("." + CLASSES.INPUT);
        elements.wrapper = elements.container.querySelector("." + CLASSES.WRAPPER);
        // Validate
        if (elements.input === null || elements.wrapper === null) {
            throw new ErrorWithCode('Library could not be initialized properly.', ErrorCodes.ERR_COULD_NOT_INITIALIZE);
        }
        // Attach listeners
        elements.container.addEventListener('click', handlers.handleRemoveClick);
        elements.input.addEventListener('keyup', handlers.handleInputChange);
        elements.input.addEventListener('paste', handlers.handleInputPaste);
        elements.input.addEventListener('blur', handlers.handleInputBlur);
        observer.observe(elements.wrapper, {
            childList: true,
        });
        // Update state
        handleAction(updateStateAction(LibraryState.Initialized));
    };
    /**
     * Kill Library
     * @public
     */
    var destroy = function () {
        // Validate state
        if (state.state !== LibraryState.Initialized) {
            throw new ErrorWithCode('Library is not initialized.', ErrorCodes.ERR_INVALID_ACTION);
        }
        if (elements.input === null) {
            throw new ErrorWithCode('Library is in wrong state.', ErrorCodes.ERR_INTERNAL);
        }
        // Clean up
        elements.container.removeEventListener('click', handlers.handleRemoveClick);
        elements.input.removeEventListener('keyup', handlers.handleInputChange);
        elements.input.removeEventListener('paste', handlers.handleInputPaste);
        elements.input.removeEventListener('blur', handlers.handleInputBlur);
        observer.disconnect();
        // Clean UI
        elements.container.textContent = '';
        elements.container.classList.remove(CLASSES.CONTAINER);
        // Clean elements
        elements.wrapper = null;
        elements.input = null;
        // Update state
        handleAction(updateStateAction(LibraryState.Destroyed));
    };
    return {
        destroy: destroy,
        init: init,
    };
};

/**
 * Validate options
 * @param options
 * @private
 */
var validateOptions = function (options) {
    var initialValue = options.initialValue, onChange = options.onChange;
    if (initialValue !== undefined && !Array.isArray(initialValue)) {
        throw new ErrorWithCode('Initial values must be an array.', ErrorCodes.ERR_INVALID_INITIAL_VALUES);
    }
    if (onChange !== undefined && typeof onChange !== 'function') {
        throw new ErrorWithCode('onChange callback is not a function.', ErrorCodes.ERR_INVALID_ON_CHANGE_CALLBACK);
    }
};
/**
 * Merge user options with default options
 * @param userOptions
 * @private
 */
var makeOptions = function (userOptions) { return (__assign({ initialValue: [], onChange: function () { } }, userOptions)); };

/**
 * Validate email
 * @param value
 */
var isValidEmail = function (value) {
    return /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,20}$/i.test(value);
};

/**
 * Remove email
 * @param action
 * @param state
 */
var handleRemoveAction = function (action, state) {
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
var handleAddAction = function (action, state, newId) {
    var entry = {
        email: action.payload,
        isValid: isValidEmail(action.payload),
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
var handleUpdateAction = function (action, state) {
    state.state = action.payload;
};

/**
 * Library's State Manipulation
 */
var stateManager = function () {
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
                isValid: isValidEmail(email),
            };
            mapper[email] = newId;
            id.current++;
            return map;
        }, {});
        return {
            emails: initialValue,
            entries: objectValues(entryMap),
            entryMap: entryMap,
            mapper: mapper,
            state: LibraryState.Initializing,
        };
    };
    /**
     * Process action
     * @param action
     * @param state
     */
    var handleAction = function (action, state) {
        switch (action.type) {
            case ActionType.Add: {
                var newId = String(id.current);
                handleAddAction(action, state, newId);
                id.current++;
                return newId;
            }
            case ActionType.Remove: {
                handleRemoveAction(action, state);
                return undefined;
            }
            case ActionType.UpdateState: {
                handleUpdateAction(action, state);
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

/**
 * Emails Input Library
 * @param element
 * @param userOptions
 */
var EmailsInput = function (element, userOptions) {
    // Merge and validate options
    var options = makeOptions(userOptions);
    validateOptions(options);
    // Init State
    var _a = stateManager(), makeState = _a.makeState, handleAction = _a.handleAction;
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
    var itemActions = makeItemActions({
        elements: elements,
        handleAction: dispatch,
        options: options,
        state: state,
    });
    // Event Handlers
    var handlers = __assign(__assign({}, makeInputHandlers(elements, itemActions)), makeEmailHandlers(itemActions));
    // Library Actions
    var libraryActions = makeLibraryActions({
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

export default EmailsInput;
//# sourceMappingURL=index.es5.js.map
