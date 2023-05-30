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

  getDocuments(): Observable<Document[]> {
    const url = this.apiUrl + 'get?key=' + this.apiKey;
    return this.http.get<string>(url).pipe(map((resp) => JSON.parse(resp))); // va parsata in JSON da una stringa
  }

 
  saveDocuments(documents: Document[]): Observable<any> {
    const url = this.apiUrl + 'set?key=' + this.apiKey;
    return this.http.post<any>(url, JSON.stringify(documents));
  }

  addBook(book: Document): void {
    this.getDocuments().subscribe((docs) => {
      docs.push(book);
      this.saveDocuments(docs).subscribe();
    });
  }

  deleteBook(book: Document): void {
    this.getDocuments().subscribe((docs) => {
      const filteredDocs = docs.filter((doc) => doc.position !== book.position);
      this.saveDocuments(filteredDocs).subscribe();
    });
  }


  
  
  
  

 
  
  
}
