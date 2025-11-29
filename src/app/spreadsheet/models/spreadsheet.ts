import { Worksheet } from './worksheet';
import { LivingDexChecklist } from '@spreadsheet/models/living-dex-checklist.type';

export interface Spreadsheet {
  id: string;
  title: string;
  username?: string;
  worksheets: Worksheet[];
  livingDexChecklist: LivingDexChecklist[];

  hasValuables?: boolean;
}
