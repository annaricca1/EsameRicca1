import { Component, Input } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ArchiveService } from '../../archive.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  standalone: true, 
  imports:[InputComponent]
})
export class LoanComponent {
  

}