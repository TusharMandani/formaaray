import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:3000'

  constructor(private http:HttpClient
  ) { 
    
  }

  submitForm(formData:any):Observable<any>{
    return this.http.post<any>(`${this.url}/login`,formData)
  }
}
