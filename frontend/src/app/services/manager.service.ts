import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiUrl = 'http://localhost:5500/users/fetch-managers';

  constructor(private http: HttpClient) {}

  fetchManagers(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response.managers && Array.isArray(response.managers)) {
          return response.managers;
        } else {
          console.error('Unexpected API response format:', response);
          return [];
        }
      })
    );
  }
}
