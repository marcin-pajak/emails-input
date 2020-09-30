import { ChangeType } from '../constants';

export interface Options {
  initialValue: string[];
  onChange: (changed: string, type: ChangeType, newValue: string[]) => void;
}
