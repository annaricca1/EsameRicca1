import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddComponent } from './add/add.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, AddComponent, SearchComponent],
})
export class AppComponent {
  
}
