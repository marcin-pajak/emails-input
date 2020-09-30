export declare enum ErrorCodes {
    ERR_INVALID_INITIAL_VALUES = "ERR_INVALID_INITIAL_VALUES",
    ERR_INVALID_ON_CHANGE_CALLBACK = "ERR_INVALID_ON_CHANGE_CALLBACK",
    ERR_EMAIL_NOT_FOUND = "ERR_EMAIL_NOT_FOUND",
    ERR_INVALID_ACTION = "ERR_INVALID_ACTION",
    ERR_COULD_NOT_INITIALIZE = "ERR_COULD_NOT_INITIALIZE",
    ERR_INTERNAL = "ERR_INTERNAL"
}
/**
 * Custom Error with code
 */
export declare class ErrorWithCode extends Error {
    code: string;
    constructor(message: string, code: ErrorCodes);
}
//# sourceMappingURL=error.d.ts.map