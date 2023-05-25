import { Component, EventEmitter, Output } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ArchiveService } from '../../archive.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  standalone: true, 
  imports:[InputComponent],
  providers:[ArchiveService]

})
export class LoanComponent {
  @Output() annullaEvent = new EventEmitter<boolean>();

  annulla(){
    this.annullaEvent.emit(false);
  }





}