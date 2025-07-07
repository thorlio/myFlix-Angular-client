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
  user: any = {};
  profileForm!: FormGroup;
  favoriteMovieIds: string[] = [];
  favoriteMovieDetails: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

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

  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((allMovies: any[]) => {
      this.favoriteMovieDetails = allMovies.filter((m: any) =>
        this.favoriteMovieIds.includes(m._id)
      );
    });
  }

  removeFavorite(movieId: string): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(() => {
        alert('Removed from favorites!');
        this.getUser();
      });
    }
  }

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
