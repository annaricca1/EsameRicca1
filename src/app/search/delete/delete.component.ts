import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ArchiveService } from '../../archive.service';
import { Document } from '../../document.model';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  standalone: true,
  imports:[CommonModule],
  providers:[ArchiveService]
})
export class DeleteComponent{
  @Input() document: Document = new Document(0, "", "", "")
  title: string = '';
  author: string = '';
  open: boolean = false;

  openMessage(){
    if (this.document.borrower !== 'disponibile'){
      this.open = true; 
    }
  }
  closeMessage(){
    this.open = false;
    }

  constructor(private archiveService: ArchiveService) {}
  deleteBook() {
    if (this.document.borrower !== 'disponibile'){
      console.log("Non si può eliminare");
    }
    else{
    console.log(this.document);
    const bookToDelete: Document = {
      title: this.document.title,
      author: this.document.author,
      position: 0, // Questo valore non è rilevante per la cancellazione
      borrower: '', // Questo valore non è rilevante per la cancellazione
    };
    this.archiveService.deleteBook(bookToDelete);
  }
}
  
  }

