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
  positionList: number[] = [];
  message: string;

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
    setInterval(() => {
      this.selezione2 = false;
    }, 1500);
  }
  openMessageNoAdd () {
    this.selezione3 = true; 
    setInterval(() => {
      this.selezione3 = false;
    }, 4000);
  }
  
  


  addBook() {
    if (this.title && this.author && this.position){
      this.archiveService.getDocuments().subscribe((documents) => {
        const positions = documents.map((doc) => doc.position);
        if (positions.includes(this.position)) {
          console.log('Posizione già presente nella biblioteca');
          this.openMessageNoAdd();
        }
      
      else {
      this.positionList.push(this.position),
      console.log(this.positionList);
      this.archiveService.addBook({
        title: this.title,
        author: this.author,
        position: this.position,
        borrower: 'disponibile',
      });
      this.openMessageAdd();
      this.reset();


    }
  });
}
   else {
     console.log("campi vuoti, impossibile aggiungere il testo")
     this.openMessageNoAdd();
     this.reset();

   }
  }

  reset() {  
    var inputTitle: HTMLInputElement = document.getElementById("Titolo") as HTMLInputElement;
    inputTitle.value = "";
    var inputAuthor: HTMLInputElement = document.getElementById("Autore") as HTMLInputElement;
    inputAuthor.value = "";
    var inputPosition: HTMLInputElement = document.getElementById("ID") as HTMLInputElement;
    inputPosition.value = "";
  }
  
}
