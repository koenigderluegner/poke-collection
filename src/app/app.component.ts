import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Spreadsheet } from '@spreadsheet/models/spreadsheet';
import { RouterOutlet } from '@angular/router';
import { SpreadsheetFacade } from '@spreadsheet/spreadsheet.facade';
import { DatabaseFacadeService } from './database/database-facade.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from '@core/components/layout/footer/footer.component';
import { HeaderComponent } from '@core/components/layout/header/header.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { SPREADSHEET_ID_TOKEN } from '@shared/spreadsheet-id-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    FooterComponent,
    RouterOutlet,
    HeaderComponent,
    SpinnerComponent,
  ]
})
export class AppComponent implements OnInit {
  spreadsheet: Spreadsheet | undefined;
  loadingMessage: string | undefined;
  protected databasesLoaded = signal(false);
  protected foundCachedSheet = signal(false);
  protected resolvedOrUnnecessary = signal(false);
  hideSpinner = computed(() => this.databasesLoaded() && (this.foundCachedSheet() || this.resolvedOrUnnecessary()));
  private spreadsheetFacade = inject(SpreadsheetFacade);
  currentSpreadsheet = this.spreadsheetFacade.currentSpreadsheetRef;
  private databaseFacadeService = inject(DatabaseFacadeService);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  readonly #spreadsheetId = inject(SPREADSHEET_ID_TOKEN);

  constructor() {
    effect(() => {
      const error = this.spreadsheetFacade.currentSpreadsheetRef.error();
      if (error)
        if ('status' in error && typeof error.status === 'number')
          this.loadingMessage = this.spreadsheetFacade.convertApiErrors(error.status).message ?? undefined;
    });

    effect(() => {
      const error = this.spreadsheetFacade.currentSpreadsheetRef.status();
      if (error === 'resolved' || error === 'local')
        this.resolvedOrUnnecessary.set(true);
    });
  }

  ngOnInit(): void {

    this.registerIcons([
      {title: 'github', link: 'assets/images/svg-icons/github.svg'},
      {title: 'shiny-stars', link: 'assets/images/svg-icons/shiny-stars.svg'},
    ]);

    this.databaseFacadeService.loadDatabases().subscribe({
      next: () => this.databasesLoaded.set(true)
    });
    this.loadData(this.#spreadsheetId);


  }

  loadData(spreadsheetId: string, username?: string): void {


      this.loadingMessage = 'Load databases from server';

      this.loadingMessage = 'Loading spreadsheet from Google API';
      setTimeout(() => this.spreadsheetFacade.currentSpreadsheetId.set(spreadsheetId), 3000);
      this.foundCachedSheet.set(this.spreadsheetFacade.loadCachedSpreadsheet(spreadsheetId));


  }

  registerIcons(iconList: { title: string; link: string; }[]): void {
    for (const icon of iconList) {
      this.matIconRegistry.addSvgIcon(
        icon.title,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.link)
      );
    }
  }

}
