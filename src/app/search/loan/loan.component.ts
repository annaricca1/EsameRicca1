import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() documentId: number;
  @Input() isBorrowed: boolean; 
  @Output() updateDocument = new EventEmitter<string>();

  selezionataLoan: boolean = false;
  selezionataGiveback: boolean = false;
  name: string; 
  surname: string;
  position: number; 
  message: boolean = false;

  

  openLoan(){
    this.selezionataLoan = true; 
  };
  closeLoan() {
    this.selezionataLoan = false;
  }
  openGiveback(){
    this.selezionataGiveback = true; 
  };
  closeGiveback() {
    this.selezionataGiveback = false;
  }
  openMessage(){
    this.message = true;
  }

  constructor(private archiveService: ArchiveService){}
  loanDocuments(): void {
    if (this.name && this.surname){
    this.archiveService.getDocuments().subscribe((documents: Document[]) => {
      const updatedDocuments = documents.map((document: Document) => {
        if (document.position === this.documentId) {
          document.borrower = this.name + ' ' + this.surname;
        }
        return document;
      });
      this.archiveService.saveDocuments(updatedDocuments).subscribe();
      this.updateDocument.emit('Libro preso in prestito');


    });
  }
  else {
    this.openMessage();  
  }
  }
  

  givebackDocuments(){
    this.archiveService.getDocuments().subscribe((documents: Document[]) => {
      const updatedDocuments = documents.map((document: Document) => {
        if (document.position === this.documentId) {
          document.borrower = 'disponibile';
        }
        return document;
      });
      this.archiveService.saveDocuments(updatedDocuments).subscribe();
      this.updateDocument.emit('Libro restituito correttamente');

    });
  }



}

 
