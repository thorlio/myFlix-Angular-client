import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://ohmyflix-1cea4b4ad120.herokuapp.com/';

  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + 'users', userDetails);
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login', userDetails);
  }

 getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  console.log("token being sent", token);
  return this.http.get(this.apiUrl + 'movies', {
    headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
  });
}


  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'directors/' + directorName, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'genres/' + genreName, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + 'users/' + username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(this.apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(this.apiUrl + `users/${username}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({ Authorization: 'Bearer  ' + token })
    });
  }

  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(this.apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiUrl + 'users/' + username, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }

  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiUrl + `users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    });
  }
}
