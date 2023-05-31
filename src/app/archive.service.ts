import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  private apiUrl =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  private apiKey = '6330cecb';

  constructor(private http: HttpClient) {}

  /*
  Metodo per ottenre i documenti dall'API. Il risultato viene parsato in JSON da una stringa
  */
  getDocuments(): Observable<Document[]> {
    const url = this.apiUrl + 'get?key=' + this.apiKey;
    return this.http.get<string>(url).pipe(map((resp) => JSON.parse(resp))); 
  }

 /*
 Metodo per salvare i documenti nell'API. Con JSON.stringify si converte l'array di oggetti documents in una stringa JSON
*/
  saveDocuments(documents: Document[]): Observable<any> {
    const url = this.apiUrl + 'set?key=' + this.apiKey;
    return this.http.post<any>(url, JSON.stringify(documents));
  }

/*
Metodo per gestire l'aggiunta di un documento. Dopo aver scaricato il database in locale viene aggiunto il libro, e successivamente viene ricaricato.
*/
  addBook(book: Document): void {
    this.getDocuments().subscribe({
      next: (docs) => {
        docs.push(book)
        this.saveDocuments(docs).subscribe()
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }

/*
Metodo per gestire la rimozione di un documento. Dopo aver scaricato il database in locale viene usato filter per creare un array con tutti i documenti con posizione(ID) differenti da quelli del libro selezionato. Successivamente questo viene poi ricaricato usando saveDocuments()
*/
  deleteBook(book: Document): void {
    this.getDocuments().subscribe({
      next: (docs) => {
       const filteredDocs = docs.filter((doc) => doc.position !== book.position);
       this.saveDocuments(filteredDocs).subscribe();
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  
  }


  
  
  
  

 
  
  
}
