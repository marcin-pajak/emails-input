import { EntryMap } from '../../state/types';
import { emailsTemplate } from '../emails';

jest.mock('../email');

describe('emails template should', (): void => {
  it('return valid template', (): void => {
    expect.hasAssertions();

    const emailMap: EntryMap = {
      '1': {
        email: 'valid@email.com',
        isValid: true,
      },
      '2': {
        email: 'invalid',
        isValid: false,
      },
    };

    expect(emailsTemplate(emailMap)).toMatchSnapshot();
  });
});
