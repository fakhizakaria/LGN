import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { GoogleCalendarService } from '../services/google-calendar.service';
import dayGridPlugin from '@fullcalendar/daygrid';


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
  googleMeetLink?: string; // Add this property for the Google Meet link
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
    private calendarService: GoogleCalendarService
  ) {}

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
      this.eventsCalendar = data.items
        .map((event: any) => this.formatEvent(event))
        .sort((a: CalendarEvent, b: CalendarEvent) => {
          const dateA = new Date(a.start).getTime();
          const dateB = new Date(b.start).getTime();
  
          // Sort by start date in reverse order
          return dateB - dateA;
        });
  
      this.calendarOptions.events = this.eventsCalendar;
    });
  }
  
  
  formatEvent(event: any): CalendarEvent {
    // Extracting the Google Meet link from the description
    const descriptionWithLink = event.description || '';
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/;
    const meetLinkMatches = descriptionWithLink.match(linkRegex);
    const googleMeetLink = meetLinkMatches ? meetLinkMatches[2] : '';

    // Remove the Google Meet link pattern and <br> tags from the description
    const descriptionWithoutLink = descriptionWithLink
        .replace(linkRegex, '')
        .replace(/<br\s*\/?>/g, '');

    return {
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
        location: event.location,
        description: descriptionWithoutLink.trim(),
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
