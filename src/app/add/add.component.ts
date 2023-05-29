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

  constructor(private archiveService: ArchiveService) {}

  title: string = '';
  author: string = '';

  openAdd(){
    this.selezione = true; 
  };
  closeAdd() {
    this.selezione = false;
    this.selezione2 = false;
  }
  openMessage(){
    this.selezione2 =true;
  }


  addBook() {
    this.archiveService.addBook({
      title: this.title,
      author: this.author,
      position: Math.round(Math.random()*100),
      borrower: 'disponibile',
    });
  }
  
}
