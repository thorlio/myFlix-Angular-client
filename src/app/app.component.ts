import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

/**
 * The root component of the myFlix Angular application.
 *
 * This component is the application toolbar and handles routing
 * and user logout.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * The title displayed in the browser tab.
   */
  title = 'myFlix-Angular-client';

  /**
   * Logs the user out by clearing local storage and reloading the page.
   * Called when the user clicks the Logout button.
   */
  logout(): void {
    localStorage.clear();
    location.reload();
  }
}
