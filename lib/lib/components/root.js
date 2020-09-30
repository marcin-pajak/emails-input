"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootTemplate = void 0;
var constants_1 = require("../constants");
var emails_1 = require("./emails");
var input_1 = require("./input");
/**
 * Root Component Template
 * @param state
 */
exports.rootTemplate = function (state) { return "\n  <div class=\"" + constants_1.CLASSES.WRAPPER + "\">\n    " + emails_1.emailsTemplate(state.entryMap) + "\n    " + input_1.inputTemplate() + "\n  </div>\n"; };
//# sourceMappingURL=root.js.map