import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { appRoutes } from './app-routing.module';
import { SlugifyPipe } from '@shared/pipes/slugify.pipe';
import { API_KEY } from '../environments/api-key.injection-token';
import { environment } from '../environments/environment';
import { SPREADSHEET_ID_TOKEN } from '@shared/spreadsheet-id-token';


export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
    ),
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: {position: 'above'}},
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    SlugifyPipe,
    {provide: API_KEY, useValue: environment.googleApiKey},
    {provide: SPREADSHEET_ID_TOKEN, useValue: '1Vv5VjgTBECyq4iTODtok9JEYR8lWRd5L2ekTD5QaC2M'},

  ],
};
