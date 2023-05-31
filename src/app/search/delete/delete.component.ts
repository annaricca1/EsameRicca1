import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ArchiveService } from '../../archive.service';
import { Document } from '../../document.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [ArchiveService],
})
export class DeleteComponent {
  @Input() document: Document = new Document(0, '', '', '');
  @Output() updateDocument = new EventEmitter<string>();
  @Output() deleteMessage = new EventEmitter<string>();
  title: string;
  author: string;
  open: boolean = false;

  openMessage() {
    if (this.document.borrower !== 'disponibile') {
      this.open = true;
      setInterval(() => {
        this.open = false;
      }, 2000);
    }
  }
 
  constructor(private archiveService: ArchiveService) {}

  deleteBook() {
    if (this.document.borrower !== 'disponibile') {
      this.openMessage();
    } 
    else {
      const bookToDelete: Document = {
        title: "", // valore non rilevante per la cancellazione
        author: "", // valore non rilevante per la cancellazione
        position: this.document.position, 
        borrower: '', // valore non rilevante per la cancellazione
      };
      this.archiveService.deleteBook(bookToDelete);
      this.updateDocument.emit('Libro eliminato con successo');
      this.deleteMessage.emit();
    }
  }
  
}
