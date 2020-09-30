import { objectEntries } from '../../utils/object';
import { Entry, EntryMap } from '../state/types';
import { emailTemplate } from './email';

/**
 * Emails Component Template
 * @param entryMap
 */
export const emailsTemplate = (entryMap: EntryMap): string =>
  objectEntries<Entry>(entryMap)
    .map(([localId, entry]: [string, Entry]): string =>
      emailTemplate(entry, localId),
    )
    .join('');
