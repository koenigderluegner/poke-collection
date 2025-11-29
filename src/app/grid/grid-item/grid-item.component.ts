import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { GridAppearanceType } from '../grid-appearance.type';
import { Pokemon } from '@shared/interfaces/pokemon';
import { Breedable } from '@shared/interfaces/breedable.interface';

@Component({
  selector: 'app-grid-item',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent {

  readonly pokemon = input<Pokemon | Breedable>();
  readonly appearance = input<GridAppearanceType>();

}
