import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieSynopsisDialogComponent } from '../movie-synopsis-dialog/movie-synopsis-dialog.component';

/**
 * This is the movie card component.
 * It shows a list of all movies and gives users options to:
 * - open a dialog with genre, director, or synopsis info
 * - add a movie to their favorites
 * - log out of the app
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * List of movies pulled from the database.
   */
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * Runs right when this screen loads. Calls the function to load all movies.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Calls the API to fetch all movies and puts them into the `movies` array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * Opens a little pop-up (dialog) with genre info.
   * @param genre The genre data from the movie.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: genre?.Name || genre,
        description: genre?.Description || '',
      },
    });
  }

  /**
   * Opens a dialog that shows info about the movie's director.
   * @param director The director object.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: director,
    });
  }

  /**
   * Opens a dialog showing the movie's title and description.
   * @param movie The full movie object.
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisDialogComponent, {
      width: '400px',
      data: {
        title: movie.title,
        description: movie.description,
      },
    });
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   * @param movieId The ID of the movie to add.
   */
  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(() => {
        alert('Movie added to favorites!');
      });
    }
  }

  /**
   * Logs the user out and sends them back to the welcome screen.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
