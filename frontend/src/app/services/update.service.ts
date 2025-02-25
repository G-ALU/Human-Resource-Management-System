import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobData {
  image: string;
  title: string;
  description: string;
  location: string;
  status: string;
  salary: number | string; // Allow both number and string since form returns string
}

@Injectable({
  providedIn: 'root'
})
export class EventServices {
  private apiUrl = 'http://localhost:5500/jobs';

  constructor(private http: HttpClient) {}

  updatejobs(job_id: string, jobData: JobData | FormData): Observable<any> {
    if (jobData instanceof FormData) {
      // FormData for file upload (multipart/form-data)
      return this.http.put(`${this.apiUrl}/${job_id}`, jobData);
    } else {
      // Plain object for JSON (application/json)
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put(`${this.apiUrl}/${job_id}`, jobData, { headers });
    }
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class EventServices {
//   private apiUrl = 'http://localhost:5500/jobs';

//   constructor(private http: HttpClient) {}

//   updatejobs(job_id: string, jobData: FormData): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${job_id}`, jobData);
//   }
// }
