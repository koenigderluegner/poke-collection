import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Move } from '../models/move.interface';
import { MoveDatabase } from '../models/move-database.interface';

@Injectable({
  providedIn: 'root'
})
export class MoveService {
  private httpClient = inject(HttpClient);


  private db: MoveDatabase | undefined;

  loadDatabase(): Observable<MoveDatabase> {
    if (this.db) {
      return of(this.db);
    } else {
      return forkJoin({
        moves: this.httpClient.get<Move[]>('assets/database/moves.json'),
      }).pipe(
        tap(database => {
          this.db = database;
        })
      );
    }


  }

  findMove(name: string): Observable<Move> {
    return this.loadDatabase().pipe(
      switchMap((database: MoveDatabase) => {
        const hits = database.moves.filter((move: Move) => {
          return move.name.toLowerCase() === name.toLowerCase();
        });
        if (hits.length === 0) {
          throwError('No move found with name: ' + name);
        }
        return of(hits[0]);
      })
    );
  }


}
