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
  selezionata: boolean = false;
  borrower: string;
  title: string;
  author: string;
  position: number; 

  

  openLoan(){
    this.selezionata = true; 
  };
  closeLoan() {
    this.selezionata = false;
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
  
  

/*
  loanDocuments(): void {
    this.archiveService.getDocuments().subscribe((docs) =>{
      const selectedDocs = docs.map(doc => {
          return {
          position:  doc.position, 
          title: doc.title, 
          author: doc.author, 
          borrower: this.borrower};
      });
        this.archiveService.saveDocuments(selectedDocs).subscribe();
    }); 
  }
  */
}

 
