// src/app/services/revenue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private apiUrl = 'http://localhost:5500/bookings/book/revenue';

  constructor(private http: HttpClient) { }

  getTotalRevenue(): Observable<number> {
    return this.http.get<{ totalRevenue: number }>(this.apiUrl).pipe(
      map(response => response.totalRevenue)
    );
  }
}
