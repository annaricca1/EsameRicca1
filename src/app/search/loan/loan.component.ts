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
  name: string = ''; 
  surname: string = '';
  position: number; 
  message: boolean = false;

/*
Funzioni permettono di mostrare o meno il prestito o la restituzione di un documento
*/
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

  /*
  Funzione per la visualizzazione di un messaggio per informare l'utente che alcuni dati sono mancanti
   */
  openMessage(){
    this.message = true;
    setInterval(() => {
      this.message = false;
    }, 3000);
  }

  constructor(private archiveService: ArchiveService){}


/*
loanDocuments() se i campi sono entrambi compilati, richiama la getDocuments per scaricare l'archivio. Dopodichè, in base alla posizione del documento selezionato, modifica il campo borrower con il name e il surname inseriti in input dall'utente. Viene poi invocata la saveDocumens per ricaricare i dati aggiornati 
*/
  loanDocuments(): void {
    if (this.name.trim() !== '' && this.surname.trim() !== ''){
      this.archiveService.getDocuments().subscribe({
        next: (documents: Document[]) => {
          const updatedDocuments = documents.map((document: Document) => {
          if (document.position === this.documentId) {
            document.borrower = this.name + ' ' + this.surname;
          }
          return document;
          });
          this.archiveService.saveDocuments(updatedDocuments).subscribe();
          this.updateDocument.emit('Libro preso in prestito');
        },
        error: (err) =>
          console.error('Observer got an error: ' + JSON.stringify(err)),
      });
    }
    else {
      this.openMessage();  
    }
  }
  
/*
givebackDocumetns() ha funzionalità inversa rispetto alla funzione sopradescritta, infatti in base alla posizione del documento selezionato, il campo borrower viene modificato, passando dal name e il surname, a 'disponibile'. 
*/
  givebackDocuments(){
    this.archiveService.getDocuments().subscribe({
      next: (documents: Document[]) => {
        const updatedDocuments = documents.map((document: Document) => {
        if (document.position === this.documentId) {
          document.borrower = 'disponibile';
        }
        return document;
      });
        this.archiveService.saveDocuments(updatedDocuments).subscribe();
        this.updateDocument.emit('Libro restituito correttamente');
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }


}

 
