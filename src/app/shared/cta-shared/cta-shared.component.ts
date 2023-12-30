import { Component } from '@angular/core';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'cta-shared',
  templateUrl: './cta-shared.component.html',
  styleUrl: './cta-shared.component.scss'
})
export class CtaSharedComponent {

  email = 'linguanature94@gmail.com';
  showDetailsFlag = false;
  animationStopped = false;

  publicEvents: any[] = [];
  nearestEvent: any = {};

  whatsAppImagePath: string = 'assets/images/social_media/whatsapp.png';
  gmailImagePath: string = 'assets/images/social_media/gmail.png';
  locationImagePath: string = 'assets/images/events/emplacement.png';
  timeIntervalEventImagePath: string = 'assets/images/events/debut-de-sablier.png';

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit() {
    this.fetchPublicEvents();
  }
  
  fetchPublicEvents() {
    this.googleCalendarService.getPublicEvents().subscribe(
      (data) => {
        this.publicEvents = data.items;
  
        const now = new Date().toISOString();
        const upcomingEvents = this.publicEvents.filter(event => new Date(event.start.dateTime || event.start.date) > new Date(now));
  
        if (upcomingEvents.length > 0) {
          this.nearestEvent = upcomingEvents[0];
          this.removeLinkFromDescription(); 
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements publics : ', error);
      }
    );
  }
  
  removeLinkFromDescription() {
    if (this.nearestEvent.description) {
      const withoutLink = this.nearestEvent.description.replace(/<br><br><a.*?a>/g, '');
      this.nearestEvent = { ...this.nearestEvent, description: withoutLink };
    }
  }
  
  showDetails() {
    this.showDetailsFlag = !this.showDetailsFlag;
    this.animationStopped = this.showDetailsFlag;
  }
}
