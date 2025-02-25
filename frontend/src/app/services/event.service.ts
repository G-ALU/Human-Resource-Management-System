import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { jobs } from './../../../../../Backend/src/Models/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService1 {
  private apiUrl = 'http://localhost:5500/jobs';

  constructor(private http: HttpClient) {}

  getalljobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-jobs`);
  }
  getonejob(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${jobId}`);
  }

  createjobs(jobData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, jobData);
  }

  updatejobs(jobId: string, jobData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${jobId}`, jobData);
  }

  deletejobs(jobId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${jobId}`);
  }
}
