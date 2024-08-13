import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Move } from '../../models/move.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrl: './move-list.component.scss'
})
export class MoveListComponent {
  @Input() moves: Move[] | null = null
  @Output() remove = new EventEmitter<string>()
}
