import { Component, OnInit, Input } from '@angular/core';
import { ArchiveService } from '../../archive.service';
import { Document } from '../../document.model';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  standalone: true,
  providers:[ArchiveService]
})
export class DeleteComponent{
  @Input() document: Document = new Document(0, "", "", "")
  title: string = '';
  author: string = '';

  constructor(private archiveService: ArchiveService) {}
  onInit(){
  }
  deleteBook() {
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

