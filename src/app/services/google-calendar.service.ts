import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  private readonly apiKey = 'AIzaSyBkgaHpQ5cYUmutqY6I7CcFngx_Y8umbXQ'; //  API key
  private readonly calendarId = 'linguanature94@gmail.com'; //  calendar ID

  constructor(private http: HttpClient) { }

  getPublicEvents() {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${this.calendarId}/events?key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  
}
