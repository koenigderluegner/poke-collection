import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { PokemonEntry } from '../models/pokemon-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private httpClient = inject(HttpClient);


  private db: PokemonEntry[] | undefined;

  loadDatabase(): Observable<PokemonEntry[]> {
    if (this.db) {
      return of(this.db);
    } else {
      return this.httpClient.get<PokemonEntry[]>('assets/database/pokemon.json').pipe(
        tap(database => {
          this.db = database;
        })
      );
    }
  }


  findPokemon(name: string): Observable<PokemonEntry> {
    return this.loadDatabase().pipe(
      switchMap(database => {
        const hits = database.filter((pokemon: PokemonEntry) => {
          return pokemon.name.toLowerCase() === name.toLowerCase();
        });
        if (hits.length === 0) {
          throwError('No pokemon found with name: ' + name);
        }
        return of(hits[0]);
      })
    );
  }

}
