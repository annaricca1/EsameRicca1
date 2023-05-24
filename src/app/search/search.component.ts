import { Component } from '@angular/core';
import { ArchiveService } from '../archive.service';
import { Document } from '../document.model';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, InputComponent, DeleteComponent],
  providers: [ArchiveService],
})
export class SearchComponent {
  searchResults: Document[] = [];

  constructor(private archiveService: ArchiveService) {}

  search(value: string) {
    this.archiveService
      .getDocuments()
      .subscribe(
        (e) =>
          (this.searchResults = e.filter((doc) => doc.title.includes(value)))
      );
  }
  
}
