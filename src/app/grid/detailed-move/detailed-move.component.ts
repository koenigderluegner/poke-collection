import { Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-detailed-move',
  templateUrl: './detailed-move.component.html',
  styleUrls: ['./detailed-move.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'detailed-move',
    '[class]': 'typeClass()'
  }
})
export class DetailedMoveComponent {

  move = input<string>('unknown');
  type = input<string>('unknown');
  typeClass = computed(() => 'move-' + this.type());


}
