import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleSwitchService {
  private baseUrlManager = 'http://localhost:5500/users/switch-role';
  private baseUrlUser = 'http://localhost:5500/users/switch-role2';

  constructor(private http: HttpClient) { }

  switchRoleToManager(user_id: string): Observable<any> {
    return this.http.put<any>(this.baseUrlManager, { user_id });
  }

  switchRoleToUser(user_id: string): Observable<any> {
    return this.http.put<any>(this.baseUrlUser, { user_id });
  }
}