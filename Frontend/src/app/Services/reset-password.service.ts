import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000';

  resetPassword(email: string, oldPassword: string, newPassword: string):Observable<any> {
    return this.http.post<any>(`${this.url}/resetpassword`, {
      email,
      oldPassword,
      newPassword,
    });
  }
}
