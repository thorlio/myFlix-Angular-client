import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

/**
 * These are the routes for the app.
 * Tells Angular which component to show based on the URL path.
 */
export const appRoutes: Routes = [
  /**
   * Route for the welcome page (login/signup screen)
   */
  { path: 'welcome', component: WelcomePageComponent },

  /**
   * Route to show the movie list
   */
  { path: 'movies', component: MovieCardComponent },

  /**
   * Route to show user profile info
   */
  { path: 'profile', component: UserProfileComponent },

  /**
   * Default route – redirects to welcome if nothing is typed in the URL
   */
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
