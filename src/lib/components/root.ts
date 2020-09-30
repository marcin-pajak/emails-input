import { CLASSES } from '../constants';
import { State } from '../state/types';
import { emailsTemplate } from './emails';
import { inputTemplate } from './input';

/**
 * Root Component Template
 * @param state
 */
export const rootTemplate = (state: State): string => `
  <div class="${CLASSES.WRAPPER}">
    ${emailsTemplate(state.entryMap)}
    ${inputTemplate()}
  </div>
`;
