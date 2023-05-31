import { Component } from '@angular/core';
import { ArchiveService } from '../archive.service';
import { Document } from '../document.model';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';
import { LoanComponent } from './loan/loan.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    InputComponent,
    DeleteComponent,
    LoanComponent,
  ],
  providers: [ArchiveService],
})
export class SearchComponent {
  searchResults: Document[] = [];
  isBorrowed: boolean;
  message: string;

  constructor(private archiveService: ArchiveService) {}

/*
Funzione che, quando invocata, azzera i risultati della ricerca, eliminando anche i caratteri digitati all'interno dell'input element
*/
  update(message: string) {
    this.searchResults = [];
    this.message = message;
    setInterval(() => {
      this.message = '';
    }, 1500);
    var inputCerca: HTMLInputElement = document.getElementById("Cerca") as HTMLInputElement;
    inputCerca.value = "";
  }
  
/*
searchDocuments, dopo aver scaricato il contenuto del database tramite getDocuments, viene invocato filter per filtrare l'array dei documenti in base a quelli che includono il titolo o l'autore inseriti nel campo di ricerca
*/
  searchDocuments(value: string) {
    if (value == '') {
      this.searchResults = [];
      return;
    }
    const lowercaseValue = value.toLowerCase(); // converte il valore della ricerca in minuscolo
    this.archiveService.getDocuments().subscribe({
      next: (e) =>
        this.searchResults = e.filter(
          (doc) =>
            doc.title.toLowerCase().includes(lowercaseValue) ||
            doc.author.toLowerCase().includes(lowercaseValue)
        ),
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
}
