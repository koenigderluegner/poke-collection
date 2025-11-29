import { computed, Directive, input } from '@angular/core';
import { Pokemon } from '@shared/interfaces/pokemon';
import { categoriesOf } from '@shared/functions/pokemon-categories.function';

@Directive({
    host: {
      '[class]': 'categories()'
    }
  }
)
export class GridBaseAppearanceDirective {
  protected pokemon = input.required<Pokemon>();
  protected categories = computed(() => categoriesOf(this.pokemon()));

}
