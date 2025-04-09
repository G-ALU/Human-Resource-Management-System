import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceanalyticsService {
  private apiUrl = 'http://localhost:5500/performance';

  constructor(private http: HttpClient) {}

  createperformancesummary(performanceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, performanceData);
  }
}
