import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * UserProfileComponent handles user data display and management,
 * including viewing and editing profile info, favorite movies, and
 * deleting the account.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * Holds user data fetched from the backend.
   */
  user: any = {};

  /**
   * The form group used to update user profile.
   */
  profileForm!: FormGroup;

  /**
   * Stores the list of favorite movie IDs from the user profile.
   */
  favoriteMovieIds: string[] = [];

  /**
   * Stores the detailed movie objects that match favoriteMovieIds.
   */
  favoriteMovieDetails: any[] = [];

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData Injected service to interact with the backend API
   * @param fb Angular FormBuilder to create reactive forms
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private fb: FormBuilder
  ) {}

  /**
   * Angular component initialization.
   * It loads the user profile from the backend.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the current user data and initializes the profile form.
   */
  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser(username).subscribe((data) => {
        this.user = data;
        this.favoriteMovieIds = data.FavoriteMovies || [];
        this.profileForm = this.fb.group({
          Username: [data.Username, Validators.required],
          Password: ['', Validators.required],
          Email: [data.Email, Validators.required],
          Birthday: [data.Birthday],
        });
        this.loadFavoriteMovies();
      });
    }
  }

  /**
   * Loads all movies and filters only those that are in the user's favorites list.
   */
  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((allMovies: any[]) => {
      this.favoriteMovieDetails = allMovies.filter((m: any) =>
        this.favoriteMovieIds.includes(m._id)
      );
    });
  }

  /**
   * Removes a movie from the user's favorites list.
   * @param movieId The ID of the movie to remove
   */
  removeFavorite(movieId: string): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(() => {
        alert('Removed from favorites!');
        this.getUser(); // Refresh user data
      });
    }
  }

  /**
   * Updates the user's profile using the form values.
   */
  updateProfile(): void {
    if (this.profileForm.valid) {
      const username = localStorage.getItem('user');
      this.fetchApiData
        .editUser(username!, this.profileForm.value)
        .subscribe(() => {
          alert('Profile updated!');
        });
    }
  }

  /**
   * Deletes the user's account after confirmation, then clears storage and reloads.
   */
  deleteProfile(): void {
    const username = localStorage.getItem('user');
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser(username!).subscribe(() => {
        alert('Account deleted');
        localStorage.clear();
        location.reload();
      });
    }
  }
}
