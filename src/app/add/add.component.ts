import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ArchiveService } from '../archive.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  standalone: true,
  imports: [HttpClientModule, InputComponent],
  providers: [ArchiveService],
})
export class AddComponent {
  constructor(private archiveService: ArchiveService) {}

  title: string = '';
  author: string = '';



  addBook() {
    this.archiveService.addBook({
      title: this.title,
      author: this.author,
      position: Math.round(Math.random()*100),
      borrower: 'disponibile',
    });
  }
  
}
