import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
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
  generatedNumbers: number[] = [];

  constructor(private archiveService: ArchiveService) {}

  title: string = '';
  author: string = '';
  position: number = 0;

  openAdd(){
    this.selezione = true; 
  }
  closeAdd() {
    this.selezione = false;
    ;
  }
  openMessageAdd(){
    this.selezione2 =true;
  }
  openMessageNoAdd () {
    this.selezione3 = true; 
  }
  closeMessage() {
    this.selezione2 = false;
    this.selezione3 = false;
  }
  


  addBook() {
    if (this.title && this.author !== ''){
      const pos = this.generateUniquePosition();
      this.archiveService.addBook({
        title: this.title,
        author: this.author,
        position: pos, //Math.round(Math.random()*100),
        borrower: 'disponibile',
      });
      this.openMessageAdd();

    }
   else {
     console.log("campi vuoti, impossibile aggiungere il testo")
     this.openMessageNoAdd();
   }
   this.reset();
  }

  generateUniquePosition(): number {
    const position = Math.round(Math.random() * 100);
    if (this.generatedNumbers.includes(position)) {
      return this.generateUniquePosition(); // Ricorsione se il numero è già presente
    } else {
      this.generatedNumbers.push(position);
      return position;
    }
  }

  reset() {  
    var inputTitle: HTMLInputElement = document.getElementById("Titolo") as HTMLInputElement;
    inputTitle.value = "";
    var inputAuthor: HTMLInputElement = document.getElementById("Autore") as HTMLInputElement;
    inputAuthor.value = "";
  }
  
}
