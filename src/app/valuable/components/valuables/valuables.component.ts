import { Component, computed, inject, input } from '@angular/core';
import { SpreadsheetFacade } from '@spreadsheet/spreadsheet.facade';
import { SlugifyPipe } from '@shared/pipes/slugify.pipe';
import { GridService } from '../../../grid/services/grid.service';
import { Worksheet } from '@spreadsheet/models/worksheet';
import { Observable } from 'rxjs';
import { GridAppearanceType } from '../../../grid/grid-appearance.type';
import { GridItemComponent } from '../../../grid/grid-item/grid-item.component';
import { GridComponent } from '../../../grid/grid.component';
import { AsyncPipe } from '@angular/common';
import { CastValuablePipe } from '@shared/pipes/cast-valuable.pipe';

@Component({
  selector: 'app-valuables',
  templateUrl: './valuables.component.html',
  imports: [
    GridItemComponent,
    GridComponent,
    AsyncPipe,
    CastValuablePipe
  ]
})
export class ValuablesComponent {
  worksheetTitle = input<string>();
  gridAppearance$: Observable<GridAppearanceType>;
  private currentSpreadsheet = inject(SpreadsheetFacade).currentSpreadsheet;
  private slugifyPipe = inject(SlugifyPipe);
  worksheet = computed(() => {

    const spreadsheetData = this.currentSpreadsheet();

    return spreadsheetData?.worksheets.filter(
      (worksheet: Worksheet) => this.slugifyPipe.transform(worksheet.title) === this.worksheetTitle()
    )?.[0];

  });
  private gridService = inject(GridService);

  constructor() {
    this.gridService.updateHideOwnedStatusControl(true);
    this.gridService.updateHideAppearanceControl(false);
    this.gridAppearance$ = this.gridService.getGridAppearance$();
  }


}
