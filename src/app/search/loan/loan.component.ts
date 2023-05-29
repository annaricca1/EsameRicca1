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
  @Input() documentId: number;
  @Input() isBorrowed: boolean; 
  selezionataLoan: boolean = false;
  selezionataGiveback: boolean = false;

  borrower: string;
  title: string;
  author: string;
  position: number; 

  

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

  constructor(private archiveService: ArchiveService){}
  loanDocuments(): void {
    this.archiveService.getDocuments().subscribe((documents: Document[]) => {
      const updatedDocuments = documents.map((document: Document) => {
        if (document.position === this.documentId) {
          document.borrower = this.borrower;
        }
        return document;
      });
      this.archiveService.saveDocuments(updatedDocuments).subscribe();
    });
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
    });
  }
  


}

 
