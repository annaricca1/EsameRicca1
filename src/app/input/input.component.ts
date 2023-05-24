import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
})
export class InputComponent {
  @Input() label: string = 'label';
  @Output() inputValue = new EventEmitter<string>();

  onChange(event: Event) {
    this.inputValue.emit((event.target as HTMLInputElement).value);
  }
}
