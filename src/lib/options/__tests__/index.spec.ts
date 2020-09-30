import { makeOptions, validateOptions } from '..';
import { ChangeType } from '../../constants';

describe('validateOptions should', (): void => {
  it('throw for invalid initialValue', (): void => {
    expect.hasAssertions();

    expect((): void =>
      validateOptions({ initialValue: ('1' as unknown) as string[] }),
    ).toThrow('Initial values must be an array.');
  });

  it('throw for invalid onChange', (): void => {
    expect.hasAssertions();

    expect((): void =>
      validateOptions({
        onChange: ('1' as unknown) as (
          changed: string,
          type: ChangeType,
          newValue: string[],
        ) => void,
      }),
    ).toThrow('onChange callback is not a function.');
  });

  it('pass for empty options', (): void => {
    expect.hasAssertions();

    expect((): void => validateOptions({})).not.toThrow();
  });
});

describe('makeOptions should', (): void => {
  it('merge user options', (): void => {
    expect.hasAssertions();
    const userOnChange = jest.fn();

    expect(
      makeOptions({ initialValue: ['some@email.com'], onChange: userOnChange }),
    ).toStrictEqual({
      initialValue: ['some@email.com'],
      onChange: userOnChange,
    });
  });

  it('merge partial user options', (): void => {
    expect.hasAssertions();

    expect(makeOptions({ initialValue: ['some@email.com'] })).toStrictEqual({
      initialValue: ['some@email.com'],
      onChange: expect.any(Function),
    });
  });

  it('return default', (): void => {
    expect.hasAssertions();

    expect(makeOptions()).toStrictEqual({
      initialValue: [],
      onChange: expect.any(Function),
    });
  });
});
