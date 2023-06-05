import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ArchiveService } from '../archive.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  standalone: true,
  imports: [HttpClientModule, InputComponent, CommonModule],
  providers: [ArchiveService],
})
export class AddComponent {
  selezione: boolean = false;
  selezione2: boolean = false;
  selezione3: boolean = false;
  selezione4: boolean = false;
  positionList: number[] = [];
  message: string;

  constructor(private archiveService: ArchiveService) {}

  title: string = '';
  author: string = '';
  position: number = 0;

/*
Funzioni che permettono di mostrare o meno i campi per l'aggiunta di un nuovo documeneto nella biblioteca
*/
  openAdd(){
    this.selezione = true; 
  }
  closeAdd() {
    this.selezione = false;
  }

/*
Funzioni che mostrano per alcuni secondi, grazie a setInterval, messaggi relativi all'aggiunta con successo di un documento o di impossibilità nel caricarlo (dati mancanti o posizione già esistente)
*/
  openMessageAdd(){
    this.selezione2 =true;
    setInterval(() => {
      this.selezione2 = false;
    }, 1500);
  }
  openMessagePosition () {
    this.selezione3 = true; 
    setInterval(() => {
      this.selezione3 = false;
    }, 4000);
  }
  openMessageNoAdd () {
    this.selezione4 = true; 
    setInterval(() => {
      this.selezione4 = false;
    }, 4000);
  }
  
  
/*
add() permette di aggiungere un nuovo documento alla biblioteca, richiamando addBook() dal service, prendendo in input dall'utente il titolo, l'autore e la posizione dello stesso. Il campo borrower non viene preso in input ma assume il valore di 'disponibile', in quanto nel momento dell'aggiunta, il libro non è ancora stato preso in prestito da nessuno.
Vi è anche un controllo sui dati inseriti in input: che siano stati compilati e che la posizione inserita non sia già stata utilizzata
*/
  add() {
    if (this.title && this.author && this.position){
      this.archiveService.getDocuments().subscribe({
        next: (documents) => {
          const positions = documents.map((doc) => doc.position);
          if (positions.includes(this.position)) {
            this.openMessagePosition();
            this.reset();
          }
          else {
            this.positionList.push(this.position),
            this.archiveService.addBook({
              title: this.title,
              author: this.author,
              position: this.position,
              borrower: 'disponibile',
            });
            this.openMessageAdd();
            this.reset();
          }
        },
        error: (err) =>
          console.error('Observer got an error: ' + JSON.stringify(err)),
      });
    }
   else {
     console.log("campi vuoti, impossibile aggiungere il testo")
     this.openMessageNoAdd();
     this.reset();
   }
  }

/*
Funzione per eliminare dagli Input Element i caratteri digitati
*/
  reset() {  
    var inputTitle: HTMLInputElement = document.getElementById("Titolo") as HTMLInputElement;
    inputTitle.value = "";
    var inputAuthor: HTMLInputElement = document.getElementById("Autore") as HTMLInputElement;
    inputAuthor.value = "";
    var inputPosition: HTMLInputElement = document.getElementById("ID") as HTMLInputElement;
    inputPosition.value = "";
  }
  
}
