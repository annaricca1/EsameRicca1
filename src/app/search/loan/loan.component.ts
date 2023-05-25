import { Component, Input } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ArchiveService } from '../../archive.service';
import { CommonModule } from '@angular/common';
import { Document } from '../../document.model';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  standalone: true, 
  imports:[InputComponent, CommonModule],
  providers:[ArchiveService]

})
export class LoanComponent {
  selezionata: boolean = false;
  borrower: string = '';

  selezionaLoan(){
    this.selezionata = true; 
  };
  annulla() {
    this.selezionata = false;
  }

  constructor(private archiveService: ArchiveService){}

  loanDocuments(){
    this.archiveService.getDocuments().subscribe((docs) =>{
      const selectedDocs = docs.map(doc => {
        return {
          position: doc.position, 
          title: doc.title, 
          author: doc.author, 
          borrower: this.borrower}; 
      });
        this.archiveService.saveDocuments(selectedDocs).subscribe();
    }); 
  }
}

 
