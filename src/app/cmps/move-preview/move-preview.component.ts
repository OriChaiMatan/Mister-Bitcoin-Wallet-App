import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Move } from '../../models/move.model';

@Component({
  selector: 'move-preview',
  templateUrl: './move-preview.component.html',
  styleUrl: './move-preview.component.scss'
})
export class MovePreviewComponent {
  @Input() move!: Move
  @Output() remove = new EventEmitter<string>()
}
