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
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: genre?.Name || genre,
        description: genre?.Description || '',
      },
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: director,
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(MovieSynopsisDialogComponent, {
      width: '400px',
      data: {
        title: movie.title,
        description: movie.description,
      },
    });
  }

  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(() => {
        alert('Movie added to favorites!');
      });
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
}
