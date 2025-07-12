import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

/**
 * This is the login form component.
 * It handles logging the user in and takes them to the movies view if successful.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  /**
   * Object that holds the login input (username + password)
   */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Called when the user hits "login".
   * If login is successful, stores the token + username, closes the modal,
   * shows a little popup, and sends the user to the movies page.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // Save token + username in localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);

        // Close the login modal
        this.dialogRef.close();

        // Let the user know it worked
        this.snackBar.open('Login successful!', 'OK', { duration: 2000 });

        // Go to the movies screen
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        // Show error message if login fails
        this.snackBar.open(error, 'OK', { duration: 2000 });
      },
    });
  }
}
