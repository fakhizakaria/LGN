import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // private apiUrl = 'http://localhost:8080'; // Replace with your API URL
  private apiUrl = 'https://linguanatureservice-b8a446bc3d0b.herokuapp.com'; // Heroku API URL

  constructor(private http: HttpClient) {}

  sendContactForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/contact/submit`, data);
  }
}
