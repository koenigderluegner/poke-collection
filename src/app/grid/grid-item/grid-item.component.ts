import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { GridAppearanceType } from '../grid-appearance.type';
import { Pokemon } from '@shared/interfaces/pokemon';

@Component({
  selector: 'app-grid-item',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridItemComponent {

  readonly pokemon = input.required<Pokemon>();
  readonly appearance = input<GridAppearanceType>();

}
