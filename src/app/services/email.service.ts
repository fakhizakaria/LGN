import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // private apiUrl = 'https://ec2-13-51-70-232.eu-north-1.compute.amazonaws.com:443'; 
  // private apiUrl = 'http://localhost:443/contact/submit'; 
  private apiUrl = 'http://ec2-184-72-195-30.compute-1.amazonaws.com:443'; 

  constructor(private http: HttpClient) {}

  sendContactForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact/submit`, data, { withCredentials: true });
  }
}
