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
  imports: [HttpClientModule, CommonModule, InputComponent, DeleteComponent, LoanComponent],
  providers: [ArchiveService],
})
export class SearchComponent {
  searchResults: Document[] = [];
  isBorrowed: boolean; 

  constructor(private archiveService: ArchiveService) {}

 

  search(value: string) {
    const lowercaseValue = value.toLowerCase(); // Converti il valore in minuscolo

    this.archiveService
      .getDocuments()
      .subscribe(
        (e) =>
          (this.searchResults = e.filter((doc) => doc.title.toLowerCase().includes(lowercaseValue) || doc.author.toLowerCase().includes(lowercaseValue)))
      );
  }
  
}
