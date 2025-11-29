import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Spreadsheet } from './models/spreadsheet';
import { SpreadsheetService } from './services/spreadsheet.service';
import { ApiError } from '@shared/interfaces/api-error.interface';
import { API_KEY } from '../../environments/api-key.injection-token';


interface CachedSpreadsheet {
  id: string,
  value: Spreadsheet
}

@Injectable({
  providedIn: 'root',
})
export class SpreadsheetFacade {
  currentSpreadsheetId = signal<string>('');
  // ref removes value while loading so we use linkedignal
  currentSpreadsheet = linkedSignal<Spreadsheet | undefined, Spreadsheet | undefined>({
    source: () => this.currentSpreadsheetRef.value(),
    computation: (source, previous) => {
      if (source) {
        return source;
      } else {
        return previous?.value;
      }
    }


  });
  private spreadsheetService = inject(SpreadsheetService);
  private readonly apiKey = inject(API_KEY);
  currentSpreadsheetRef = this.spreadsheetService.getSpreadsheet(this.currentSpreadsheetId, this.apiKey);
  private readonly _SPREADSHEET_CACHE_KEY = 'cachedSpreadsheet';

  constructor() {


    effect(() => {
      const currentSpreadsheet = this.currentSpreadsheetRef.value();
      if (currentSpreadsheet) {
        localStorage.setItem(this._SPREADSHEET_CACHE_KEY, JSON.stringify({
          id: currentSpreadsheet.id,
          value: currentSpreadsheet
        } satisfies CachedSpreadsheet));
      }
    });


  }

  loadCachedSpreadsheet(id: string) {
    const cachedData = localStorage.getItem(this._SPREADSHEET_CACHE_KEY);
    if (cachedData) {
      const data: CachedSpreadsheet = JSON.parse(cachedData);

      if (data.id === id) {
        this.currentSpreadsheetRef.set(data.value);
        return true;
      }
    }
    return false;
  }

  public convertApiErrors(errorStatus: number): ApiError {
    const newError = {
      state: 'unknown',
      message: ''
    };
    switch (errorStatus) {
      case 429:
        newError.message = 'Too many requests: Google request limit reached, try again later.';
        break;
      case 404:
        newError.message = 'Cannot find a spreadsheet with given ID.';
        break;
      default:
        newError.message = 'Unknown Error: please check the given ID and publish your sheet if not already.';
        break;
    }
    return newError;
  }


}
