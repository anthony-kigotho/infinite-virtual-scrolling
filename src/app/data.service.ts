import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private totalItems = 100; // Simulating 100 items
  private itemsPerLoad = 20;

  getItems(startIndex: number): Observable<string[]> {
    // Simulating fetching items starting from a given index
    const newItems = Array.from({ length: this.itemsPerLoad })
      .map((_, i) => `Item #${startIndex + i + 1}`)
      .filter((_, i) => startIndex + i < this.totalItems);
    return of(newItems).pipe(delay(1000)); // Simulate a delay like an API request
  }
}
