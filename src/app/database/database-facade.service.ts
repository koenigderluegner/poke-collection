import { inject, Injectable } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { forkJoin, Observable } from 'rxjs';
import { MoveService } from './services/move.service';
import { Move } from './models/move.interface';
import { PokemonEntry } from './models/pokemon-entry.interface';
import { Database } from './models/database.interface';
import { NaturesService } from './services/natures.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseFacadeService {
  private pokemonService = inject(PokemonService);
  private moveService = inject(MoveService);
  private naturesService = inject(NaturesService);


  loadDatabases(): Observable<Database> {
    return forkJoin({
      pokemon: this.pokemonService.loadDatabase(),
      moves: this.moveService.loadDatabase(),
    });
  }


  findPokemon(name: string): Observable<PokemonEntry> {
    return this.pokemonService.findPokemon(name);
  }

  findMove(name: string): Observable<Move> {
    return this.moveService.findMove(name);
  }


  isNature(natureToCheck: string): boolean {
    return this.naturesService.isNature(natureToCheck);
  }


}
