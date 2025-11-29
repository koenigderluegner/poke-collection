import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { DatabaseFacadeService } from '../../database/database-facade.service';
import { forkJoin, Observable } from 'rxjs';
import { PokemonEntry } from '../../database/models/pokemon-entry.interface';
import { Move } from '../../database/models/move.interface';
import { GridBaseAppearanceDirective } from '../components/grid-base-appearance.directive';
import { AsyncPipe } from '@angular/common';
import { ItemComponent } from '../../icon/item/item.component';
import { SlugifyPipe } from '@shared/pipes/slugify.pipe';
import { PokemonComponent } from '../../icon/pokemon/pokemon.component';
import { TypeBadgeComponent } from '@shared/components/type-badge/type-badge.component';
import { MatIcon } from '@angular/material/icon';
import { DetailedMoveComponent } from '../detailed-move/detailed-move.component';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    ItemComponent,
    SlugifyPipe,
    PokemonComponent,
    TypeBadgeComponent,
    MatIcon,
    DetailedMoveComponent
  ],
  host: {
    'class': 'grid-item',
  }
})
export class DetailedComponent extends GridBaseAppearanceDirective {

  natureClass = '';
  dbpokemon$: Observable<PokemonEntry> | undefined;
  moves$: Observable<Move[]> | undefined;
  private databaseFacadeService = inject(DatabaseFacadeService);

  constructor() {
    super();

    effect(() => {
      const pokemon = this.pokemon();
      if (pokemon) {
        this.natureClass = pokemon.nature
        && this.databaseFacadeService.isNature(pokemon.nature)
          ? pokemon.nature.toLowerCase()
          : '';
        this.dbpokemon$ = this.databaseFacadeService.findPokemon(pokemon?.name);
        this.moves$ = forkJoin(pokemon.moves.map(move => {
          return this.databaseFacadeService.findMove(move);
        }));


      }
    });
  }

}
