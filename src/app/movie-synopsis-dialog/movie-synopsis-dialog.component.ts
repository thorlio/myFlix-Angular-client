import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

/**
 * This component pops up a little dialog showing the movie's title and description.
 * It’s used when someone clicks “Details” on a movie card.
 */
@Component({
  selector: 'app-movie-synopsis-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class MovieSynopsisDialogComponent {
  /**
   * Grabs the movie data passed into the dialog (title and description).
   * @param data Object with movie title and description
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
