import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';

/**
 * This component shows a list of all movies in card format.
 * It pulls the data from the API when the component loads.
 */
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  /**
   * Store the list of movies fetched from the API.
   */
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  /**
   * Runs when the component loads. Fetches all movies and logs them.
   */
  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }
}
