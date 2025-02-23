import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { log } from 'node:console';
import { TokenDetails } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5500/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<TokenDetails> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TokenDetails>(`${this.apiUrl}/login`, { email, password }, { headers }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role || '');
          localStorage.setItem('userId', response.user_id || '');
        }
      }),
      catchError((error) => {
        return new Observable<TokenDetails>(observer => {
          observer.error(error);
        });
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }
}

