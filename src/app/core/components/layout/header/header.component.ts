import {
  Component,
  computed,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { SpreadsheetFacade } from '@spreadsheet/spreadsheet.facade';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { SlugifyPipe } from '@shared/pipes/slugify.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatButton,
    MatMiniFabButton,
    NgTemplateOutlet
  ],
  host: {
    'class': 'app-header',
    '(window:resize)': 'onResize($event)'
  }
})
export class HeaderComponent {
  overlay = inject(Overlay);
  viewContainerRef = inject(ViewContainerRef);
  windowSize = window.innerWidth;
  readonly templatePortalContent = viewChild.required<TemplateRef<unknown>>('menuTemplate');
  protected spreadsheetFacade = inject(SpreadsheetFacade);
  private slugifyPipe = inject(SlugifyPipe);
  valuablesLink = computed<string[] | undefined>(() => {
    const spreadsheetData = this.spreadsheetFacade.currentSpreadsheetRef.value();
    if (!spreadsheetData || !spreadsheetData.hasValuables) return;

    const valuablesLink = spreadsheetData.worksheets.filter(worksheet => worksheet.config?.type === 'Valuables')[0].title;
    return [
      '/',
      'valuables',
      this.slugifyPipe.transform(valuablesLink)];


  });
  private overlayRef?: OverlayRef;

  onResize(event: UIEvent) {
    this.windowSize = (event.target as Window).innerWidth;

    if (this.windowSize >= 1200) {
      this.overlayRef?.dispose();
    }
  }


  openMenu(): void {
    const config = new OverlayConfig();

    config.positionStrategy = this.overlay.position()
      .global()
      .top(`53px`);

    config.width = '100%';
    config.height = 'calc(100vh - 53px)';
    config.backdropClass = 'main-menu-backdrop';
    config.scrollStrategy = this.overlay.scrollStrategies.block();


    config.hasBackdrop = true;

    this.overlayRef = this.overlay.create(config);

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.dispose();
    });

    this.overlayRef.attach(new TemplatePortal(this.templatePortalContent(), this.viewContainerRef));
  }

  closeMenu(): void {
    this.overlayRef?.dispose();
  }
}
