import { PokemonEntry } from './pokemon-entry.interface';
import { MoveDatabase } from './move-database.interface';

export interface Database {
  pokemon: PokemonEntry[];
  moves: MoveDatabase;
}
