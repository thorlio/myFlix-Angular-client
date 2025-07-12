import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FetchApiDataService } from '../fetch-api-data.service';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * This is the component for the registration form.
 * It lets new users create an account by filling in their info.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent {
  /**
   * Stores form input for username, password, email, and birthday
   */
  userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UserRegistrationFormComponent>
  ) {}

  /**
   * Called when the user clicks the "Sign Up" button.
   * Sends the info to the API and shows a message based on success or failure.
   * If successful, it closes this modal and opens the login form.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        // Tell the user it worked
        this.snackBar.open('Registration successful! Please log in.', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close();

        // Give it a sec, then show the login screen
        setTimeout(() => {
          this.dialog.open(UserLoginFormComponent, {
            width: '280px',
          });
        }, 300);
      },
      error: (error) => {
        // Show error if something went wrong
        this.snackBar.open(error, 'OK', { duration: 2000 });
      },
    });
  }
}
