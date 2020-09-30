import EmailsInput from '../../..';
import { CLASSES } from '../../constants';
import { EMAIL_CLASSES, emailTemplate } from '../email';

describe('email template should', (): void => {
  it('return template for valid email', (): void => {
    expect.hasAssertions();

    expect(
      emailTemplate(
        {
          email: 'valid@email.com',
          isValid: true,
        },
        '1',
      ),
    ).toMatchSnapshot();
  });

  it('return template for invalid email', (): void => {
    expect.hasAssertions();

    expect(
      emailTemplate(
        {
          email: 'invalid',
          isValid: false,
        },
        '1',
      ),
    ).toMatchSnapshot();
  });

  it('return sanitized template', (): void => {
    expect.hasAssertions();

    expect(
      emailTemplate(
        {
          email: '<b>dangerous</b>@email.com',
          isValid: true,
        },
        '1',
      ),
    ).toMatchSnapshot();
  });
});

const ELEMENT_CLASS = 'emails-input';
describe('email component should', (): void => {
  beforeEach((): void => {
    document.body.innerHTML = `<div id="${ELEMENT_CLASS}"></div>`;
  });

  afterEach((): void => {
    const element = document.querySelector(`#${ELEMENT_CLASS}`);
    element?.remove();
  });

  it('handle remove click', (): void => {
    expect.hasAssertions();

    const initialValue = ['one@email.com'];
    const element = document.querySelector(`#${ELEMENT_CLASS}`) as HTMLElement;
    EmailsInput(element, { initialValue });
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(
      initialValue.length,
    );

    const button = element.querySelector(
      `.${EMAIL_CLASSES.removeButton}`,
    ) as HTMLButtonElement;

    button.click();
    expect(document.querySelectorAll(`.${CLASSES.EMAIL}`)).toHaveLength(0);
  });
});
