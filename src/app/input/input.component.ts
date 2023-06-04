import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
})
export class InputComponent {
  @Input() label: string = 'label';
  @Input() type: 'text' | 'number' = 'text'; 

  @Output() inputValue = new EventEmitter<any>();

/*
Funzione per la gestione dei valori inseriti nell'Input Element e per l'utilizzo di questi in altri componenti
*/
  onChange(event: Event) {
    let value: any = (event.target as HTMLInputElement).value;
    if (this.type === 'number') {
      value = parseFloat(value); // Converte il valore in un numero
      if (isNaN(value) || value < 0 ) {
        value = null; // Il valore impostato a null se il numero non è valido
      }
    }
    this.inputValue.emit(value);
  }

  
}
