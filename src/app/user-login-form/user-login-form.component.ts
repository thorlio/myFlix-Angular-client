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
    MatDialogModule
  ],
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // store the token and user locally
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);

        // close the dialog
        this.dialogRef.close();

        // show success notification
        this.snackBar.open('Login successful!', 'OK', { duration: 2000 });

        // navigate to the movies view
        this.router.navigate(['/movies']);
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    });
  }
}
