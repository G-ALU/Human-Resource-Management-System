import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5500/users/fetch-all-users';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response.users && Array.isArray(response.users)) {
          return response.users;
        } else {
          throw new Error('Unexpected API response format');
        }
      })
    );
  }
}
