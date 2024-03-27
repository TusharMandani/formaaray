import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  save(patientData: any):Observable<any>{
    return this.http.post<any>(`${this.url}/patient`, patientData);
  }

  getData():Observable<any>{
    return this.http.get<any>(`${this.url}/patient`)
  }

  deleteRecord(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/patient/${id}`);
  }

  editPatient(patientId: string, patientData: any): Observable<any> {
    return this.http.put(`${this.url}/patient/${patientId}`, patientData);
  }


  }

