import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// // Temporarily comment out the service import
// // import { FetchApiDataService } from '../fetch-api-data.service';

// @Component({
//   selector: 'app-movie-list',
//   templateUrl: './movie-list.html',
//   styleUrls: ['./movie-list.scss'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class MovieListComponent implements OnInit {
//   movies: any[] = [];

//   // Comment this out for now
//   // constructor(private fetchApiData: FetchApiDataService) {}
//   constructor() {}

//   ngOnInit(): void {
//     console.log('✅ MovieListComponent loaded');

//     // Add some dummy data
//     this.movies = [
//       { Title: 'The Matrix', Description: 'A computer hacker learns about the true nature of reality.' },
//       { Title: 'Inception', Description: 'A thief enters people’s dreams to steal secrets.' },
//       { Title: 'Interstellar', Description: 'Explorers travel through a wormhole in space.' }
//     ];
//   }
// }
