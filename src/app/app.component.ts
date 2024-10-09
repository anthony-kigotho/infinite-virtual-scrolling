import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'; 
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScrollingModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: string[] = [];
  loading = false;
  currentIndex = 0; // Keeps track of the loaded items' index

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadItems(); // Load the initial set of items
  }

  loadItems() {
    if (this.loading) return; // Prevent multiple calls
    this.loading = true;

    this.dataService.getItems(this.currentIndex).subscribe((newItems) => {
      if (newItems.length > 0) {
        this.items = this.items.concat(newItems);
        this.currentIndex += newItems.length; // Update index after items are loaded
      }
      this.loading = false; // Reset the loading flag
    });
  }

  // Trigger more loading when scrolled to the end
  onScroll(index: number) {    
    const buffer = 15;
    const loadPoint = this.items.length - buffer;

    if (index >= loadPoint && !this.loading) {
      this.loadItems(); // Load more items when reaching near the end
    }
  }
}
