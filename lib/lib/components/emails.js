"use strict";
var __read = (this && this.__read) || function (o, n) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailsTemplate = void 0;
var object_1 = require("../../utils/object");
var email_1 = require("./email");
/**
 * Emails Component Template
 * @param entryMap
 */
exports.emailsTemplate = function (entryMap) {
    return object_1.objectEntries(entryMap)
        .map(function (_a) {
        var _b = __read(_a, 2), localId = _b[0], entry = _b[1];
        return email_1.emailTemplate(entry, localId);
    })
        .join('');
};
//# sourceMappingURL=emails.js.map