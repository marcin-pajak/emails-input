import { ErrorCodes, ErrorWithCode } from '../../utils/error';
import { Options } from './types';

/**
 * Validate options
 * @param options
 * @private
 */
export const validateOptions = (options: Partial<Options>): void => {
  const { initialValue, onChange } = options;

  if (initialValue !== undefined && !Array.isArray(initialValue)) {
    throw new ErrorWithCode(
      'Initial values must be an array.',
      ErrorCodes.ERR_INVALID_INITIAL_VALUES,
    );
  }

  if (onChange !== undefined && typeof onChange !== 'function') {
    throw new ErrorWithCode(
      'onChange callback is not a function.',
      ErrorCodes.ERR_INVALID_ON_CHANGE_CALLBACK,
    );
  }
};

/**
 * Merge user options with default options
 * @param userOptions
 * @private
 */
export const makeOptions = (userOptions?: Partial<Options>): Options => ({
  initialValue: [],
  onChange: (): void => {},
  ...userOptions,
});
