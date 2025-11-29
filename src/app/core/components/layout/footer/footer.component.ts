import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'footer w-full flex justify-between tablet:px-4 flex-col tablet:flex-row py-2 px-2 duration-200 ease-linear transition-[padding] bg-[#060606]'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
}
