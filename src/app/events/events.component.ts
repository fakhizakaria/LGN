import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { GoogleCalendarService } from '../services/google-calendar.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TranslateService } from '@ngx-translate/core';


interface Attendee {
  email: string;
  responseStatus: string;
}
interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  creator?: string;
  status?: string;
  visibility?: string;
  organizer?: string;
  attendees?: Attendee[];
  googleMeetLink?: string;
  language?: string; // Added property for language
  activity?: string; // Added property for activity
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  // Services Images paths
  locationImagePath: string = 'assets/images/events/emplacement.png';
  creatorImagePath: string = 'assets/images/events/administrateur.png';
  utilisateurverifieImagePath: string = 'assets/images/events/confirmation.png';
  googleMeetImagePath: string = 'assets/images/events/google-meet.svg';
  timeIntervalEventImagePath: string = 'assets/images/events/debut-de-sablier.png';
  
  eventsCalendar: CalendarEvent[] = [];
  private pollingSubscription!: Subscription;
  clickedEventDetails: CalendarEvent | null = null;

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],
  };

  constructor(
    private calendarService: GoogleCalendarService, private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.fetchCalendarData();
    // this.pollingSubscription = interval(5000).subscribe(() => {
    //   this.fetchCalendarData();
    // });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
  
  fetchCalendarData(): void {
    this.calendarService.getPublicEvents().subscribe(data => {
      this.eventsCalendar = data.items.map((event: any) => {
        const title = event.summary || '';
        const description = event.description || '';

        const languageMatch = title.match(/Learning\s(\w+)\s/i);
        const language = languageMatch ? languageMatch[1] : '';

        const activityMatch = title.match(/While\s([\w\s]+)\s+With\s/i);
        const activity = activityMatch ? activityMatch[1] : 'hiking';

        return {
          title: event.summary,
          start: event.start.dateTime,
          end: event.end.dateTime,
          location: event.location,
          description: this.formatDescription(event.description),
          creator: event.creator?.email,
          status: event.status,
          visibility: event.visibility,
          organizer: event.organizer?.email,
          attendees: event.attendees?.map((attendee: any) => ({
            email: attendee.email,
            responseStatus: attendee.responseStatus
          })) || [],
          googleMeetLink: this.extractMeetLink(event.description),
          language,
          activity
        };
      });

      this.eventsCalendar.sort((a: CalendarEvent, b: CalendarEvent) => {
        const dateA = new Date(a.start).getTime();
        const dateB = new Date(b.start).getTime();
        return dateA - dateB;
      });

      this.calendarOptions.events = this.eventsCalendar;
    });
  }

  formatDescription(description: string | undefined): string {
    if (!description) return '';
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/;
    const sanitizedDescription = description.replace(linkRegex, '');
    return sanitizedDescription.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').trim();
  }

  extractMeetLink(description: string | undefined): string {
    if (!description) return '';
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/;
    const meetLinkMatches = description.match(linkRegex);
    return meetLinkMatches ? meetLinkMatches[2] : '';
  }
  
  formatEvent(event: any): CalendarEvent {
    // Extract Google Meet link from the description
    const descriptionWithLink = event.description || '';
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/;
    const meetLinkMatches = descriptionWithLink.match(linkRegex);
    const googleMeetLink = meetLinkMatches ? meetLinkMatches[2] : '';
  
    // Remove the Google Meet link from the description
    const sanitizedDescription = descriptionWithLink.replace(linkRegex, '');
  
    // Replace line breaks with HTML line breaks and sanitize description
    const formattedDescription = sanitizedDescription.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');
  
    return {
      title: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
      location: event.location,
      description: formattedDescription.trim(),
      creator: event.creator?.email,
      status: event.status,
      visibility: event.visibility,
      organizer: event.organizer?.email,
      attendees: event.attendees?.map((attendee: any) => ({
        email: attendee.email,
        responseStatus: attendee.responseStatus
      })) || [],
      googleMeetLink: googleMeetLink
    };
  }
  

  formatDate(dateString: string, format: 'day' | 'month' | 'year'): string {
    const date = new Date(dateString);
    switch (format) {
      case 'day':
        return date.getDate().toString();
      case 'month':
        return date.toLocaleString('default', { month: 'short' });
      case 'year':
        return date.getFullYear().toString();
      default:
        return '';
    }
  }

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}h:${minutes}m`;
  }

  
}
