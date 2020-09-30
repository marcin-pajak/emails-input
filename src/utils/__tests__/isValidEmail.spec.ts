import { isValidEmail } from '../isValidEmail';

describe('isValidEmail should', (): void => {
  it('validate proper emails', (): void => {
    expect.hasAssertions();
    expect(isValidEmail('good@email.com')).toBe(true);
  });

  it('validate wrong emails', (): void => {
    expect.hasAssertions();
    expect(isValidEmail('bad')).toBe(false);
    expect(isValidEmail('bad@')).toBe(false);
    expect(isValidEmail('bad@dot')).toBe(false);
    expect(isValidEmail('bad@dot.tolongdomainthatisnotrealltvalid')).toBe(
      false,
    );
  });
});
