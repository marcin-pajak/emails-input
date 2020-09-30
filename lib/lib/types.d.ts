import { Actions } from './actions/types';
import { Entry } from './state/types';
export interface Library extends Omit<Actions, 'removeByLocalId'> {
    emails: string[];
    entries: Entry[];
}
export interface WindowWithClipboard extends Window {
    clipboardData: ClipboardEvent['clipboardData'];
}
//# sourceMappingURL=types.d.ts.map