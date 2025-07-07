import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // ← ADD RouterLink
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,   
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  logout() {
    localStorage.clear();
    location.reload();
  }
}
