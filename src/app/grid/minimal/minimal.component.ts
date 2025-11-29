import { Component, computed, ViewEncapsulation } from '@angular/core';
import { GridBaseAppearanceDirective } from '../components/grid-base-appearance.directive';
import { PokemonComponent } from '../../icon/pokemon/pokemon.component';
import { ItemComponent } from '../../icon/item/item.component';
import { SlugifyPipe } from '@shared/pipes/slugify.pipe';

@Component({
  selector: 'app-minimal[pokemon]',
  templateUrl: './minimal.component.html',
  styleUrls: ['./minimal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    PokemonComponent,
    ItemComponent,
    SlugifyPipe
  ],
  host: {
    'class': 'grid-item',
    '[class.inactive]': 'inactive()',
  }
})
export class MinimalComponent extends GridBaseAppearanceDirective {

  inactive = computed(() => !this.pokemon()?.isOwned);
}
