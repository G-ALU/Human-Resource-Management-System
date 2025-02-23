import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { event } from './../../../../../Backend/src/Models/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService1 {
  private apiUrl = 'http://localhost:5500/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-events`);
  }
  getoneEvent(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${eventId}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, eventData);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${eventId}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventId}`);
  }
}
