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

  /*
  Funzione che permette di visualizzare per alcuni secondi, grazie a setInterval, un messaggio di impossibile cancellazione del documento
  */
  openMessage() {
    if (this.document.borrower !== 'disponibile') {
      this.open = true;
      setInterval(() => {
        this.open = false;
      }, 2000);
    }
  }
 
  constructor(private archiveService: ArchiveService) {}

/*
delete() gestisce l'eliminazione di un documento dalla biblioteca, nel caso in cui questo non sia già stato prestato (viene mostrato messaggio di errore). Il documento viene selezionato in base alla posizione, che è l'unico valore utile ai fini della cancellazione in quanto univoco. Una volta selezionato viene richiamata la deleteBook() dal service, lì opportunamente commentata
*/
  delete() {
    if (this.document.borrower !== 'disponibile') {
      this.openMessage();
    } 
    else {
      const bookToDelete: Document = {
        title: '', // valore non rilevante per la cancellazione
        author: '', // valore non rilevante per la cancellazione
        position: this.document.position, 
        borrower: '', // valore non rilevante per la cancellazione
      };
      this.archiveService.deleteBook(bookToDelete);
      this.updateDocument.emit('Libro eliminato con successo');
      this.deleteMessage.emit();
    }
  }
  
}
