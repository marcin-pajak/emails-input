"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLibraryActions = void 0;
var error_1 = require("../../utils/error");
var render_1 = require("../../utils/render");
var root_1 = require("../components/root");
var constants_1 = require("../constants");
var actionCreators_1 = require("../state/actionCreators");
var constants_2 = require("../state/constants");
/**
 * Public init / destroy actions
 * @param LibraryActionProperties
 */
exports.makeLibraryActions = function (_a) {
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
        if (state.state === constants_2.LibraryState.Initialized) {
            throw new error_1.ErrorWithCode('Library already initialized.', error_1.ErrorCodes.ERR_INVALID_ACTION);
        }
        // Render UI
        render_1.render(root_1.rootTemplate(state), elements.container);
        elements.container.classList.add(constants_1.CLASSES.CONTAINER);
        // Set elements
        elements.input = elements.container.querySelector("." + constants_1.CLASSES.INPUT);
        elements.wrapper = elements.container.querySelector("." + constants_1.CLASSES.WRAPPER);
        // Validate
        if (elements.input === null || elements.wrapper === null) {
            throw new error_1.ErrorWithCode('Library could not be initialized properly.', error_1.ErrorCodes.ERR_COULD_NOT_INITIALIZE);
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
        handleAction(actionCreators_1.updateStateAction(constants_2.LibraryState.Initialized));
    };
    /**
     * Kill Library
     * @public
     */
    var destroy = function () {
        // Validate state
        if (state.state !== constants_2.LibraryState.Initialized) {
            throw new error_1.ErrorWithCode('Library is not initialized.', error_1.ErrorCodes.ERR_INVALID_ACTION);
        }
        if (elements.input === null) {
            throw new error_1.ErrorWithCode('Library is in wrong state.', error_1.ErrorCodes.ERR_INTERNAL);
        }
        // Clean up
        elements.container.removeEventListener('click', handlers.handleRemoveClick);
        elements.input.removeEventListener('keyup', handlers.handleInputChange);
        elements.input.removeEventListener('paste', handlers.handleInputPaste);
        elements.input.removeEventListener('blur', handlers.handleInputBlur);
        observer.disconnect();
        // Clean UI
        elements.container.textContent = '';
        elements.container.classList.remove(constants_1.CLASSES.CONTAINER);
        // Clean elements
        elements.wrapper = null;
        elements.input = null;
        // Update state
        handleAction(actionCreators_1.updateStateAction(constants_2.LibraryState.Destroyed));
    };
    return {
        destroy: destroy,
        init: init,
    };
};
//# sourceMappingURL=libraryActions.js.map