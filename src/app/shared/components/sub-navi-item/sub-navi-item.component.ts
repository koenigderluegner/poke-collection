import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { SlugifyPipe } from '@shared/pipes/slugify.pipe';

@Component({
  selector: 'a[app-sub-navi-item]',
  templateUrl: './sub-navi-item.component.html',
  styleUrls: ['./sub-navi-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    'class': 'sub-navi-item',
    '[class]': 'classes()',
  },
  providers: [SlugifyPipe],
})
export class SubNaviItemComponent {
  readonly text = input<string>();
  readonly meta = input<string>();
  slugifyPipe = new SlugifyPipe();

  classes = computed(() => {
    this.slugifyPipe.transform(this.text());
  });

}
