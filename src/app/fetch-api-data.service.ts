import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service for making API requests to the movie database.
 * Handles user authentication, profile management, and movie retrieval.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /** Base URL to the backend API */
  private apiUrl = 'https://ohmyflix-1cea4b4ad120.herokuapp.com/';

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param userDetails Object containing username, password, email, and birthday.
   * @returns Observable of the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + 'users', userDetails);
  }

  /**
   * Logs in a user.
   * @param userDetails Object containing username and password.
   * @returns Observable with user data and JWT token.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login', userDetails);
  }

  /**
   * Retrieves a list of all movies.
   * @returns Observable array of movie objects.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Retrieves data for a specific movie by title.
   * @param title Movie title to search.
   * @returns Observable of the movie data.
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Retrieves information about a director.
   * @param directorName The name of the director.
   * @returns Observable containing director data.
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'directors/' + directorName, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Retrieves information about a genre.
   * @param genreName The genre to fetch.
   * @returns Observable containing genre data.
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'genres/' + genreName, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Gets a specific user's information.
   * @param username The username to retrieve.
   * @returns Observable with the user object.
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users/' + username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Gets a user's list of favorite movies.
   * @param username The username to fetch favorites for.
   * @returns Observable array of favorite movie IDs.
   */
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Adds a movie to the user's favorites.
   * @param username The username.
   * @param movieId The ID of the movie to add.
   * @returns Observable of the updated user data.
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      this.apiUrl + `users/${username}/movies/${movieId}`,
      {},
      {
        headers: new HttpHeaders({ Authorization: 'Bearer  ' + token }),
      }
    );
  }

  /**
   * Updates the user profile information.
   * @param username The username of the user.
   * @param userDetails Object with updated user fields.
   * @returns Observable of the updated user data.
   */
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Deletes a user account.
   * @param username The username of the account to delete.
   * @returns Observable of the deletion result.
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'users/' + username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    });
  }

  /**
   * Removes a movie from the user's favorites.
   * @param username The username.
   * @param movieId The ID of the movie to remove.
   * @returns Observable of the updated favorites list.
   */
  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(
      this.apiUrl + `users/${username}/movies/${movieId}`,
      {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      }
    );
  }
}
