export enum ErrorCodes {
  ERR_INVALID_INITIAL_VALUES = 'ERR_INVALID_INITIAL_VALUES',
  ERR_INVALID_ON_CHANGE_CALLBACK = 'ERR_INVALID_ON_CHANGE_CALLBACK',
  ERR_EMAIL_NOT_FOUND = 'ERR_EMAIL_NOT_FOUND',
  ERR_INVALID_ACTION = 'ERR_INVALID_ACTION',
  ERR_COULD_NOT_INITIALIZE = 'ERR_COULD_NOT_INITIALIZE',
  ERR_INTERNAL = 'ERR_INTERNAL',
}

/**
 * Custom Error with code
 */
export class ErrorWithCode extends Error {
  public code: string;

  public constructor(message: string, code: ErrorCodes) {
    super(message);
    this.code = code;
  }
}
