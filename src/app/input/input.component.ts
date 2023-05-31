import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
})
export class InputComponent {
  @Input() label: string = 'label';
  @Input() type: 'text' | 'number' = 'text'; // Aggiunto il tipo di input

  @Output() inputValue = new EventEmitter<any>();

  onChange(event: Event) {
    let value: any = (event.target as HTMLInputElement).value;
    
    if (this.type === 'number') {
      value = parseFloat(value); // Converti il valore in un numero
      if (isNaN(value) || value < 0 ) {
        value = null; // Imposta il valore a null se non è un numero valido
      }
    }

    this.inputValue.emit(value);
  }
}
