import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServices {
  private apiUrl = 'http://localhost:5500/events';

  constructor(private http: HttpClient) {}

  updateEvent(event_id: string, eventData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${event_id}`, eventData);
  }
}
