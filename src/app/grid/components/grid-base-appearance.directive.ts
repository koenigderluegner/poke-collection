import { computed, Directive, input } from '@angular/core';
import { Pokemon } from '@shared/interfaces/pokemon';
import { categoriesOf } from '@shared/functions/pokemon-categories.function';

@Directive({
    host: {
      '[class]': 'categories()'
    }
  }
)
export abstract class GridBaseAppearanceDirective {
  pokemon = input<Pokemon>();
  protected categories = computed(() => categoriesOf(this.pokemon()));

}
