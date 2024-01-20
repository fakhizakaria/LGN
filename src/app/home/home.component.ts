import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Services Images paths
  languageFacilitationImagePath: string = 'assets/images/services/facile.png';
  ConsultingImagePath: string = 'assets/images/services/mentorat.png';
  individualCoursesImagePath: string = 'assets/images/services/travail-en-cours.png';
  summerCampImagePath: string = 'assets/images/services/summer-camp.png';
  annabellaImagePath: string = 'assets/images/ana.PNG';
  // Social media Images paths
  xImagePath: string = 'assets/images/social_media/twitter.png';
  facebookImagePath: string = 'assets/images/social_media/facebook.png';
  instagramImagePath: string = 'assets/images/social_media/instagram.png';
  whatsAppImagePath: string = 'assets/images/social_media/whatsapp.png';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  testimonials = [
    {
      avatar: 'assets/images/testimonial/a.jpg',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      author: 'kattie Doe'
    },
    {
      avatar: 'assets/images/testimonial/d.jpg',
      quote: 'Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus.',
      author: 'Smith Will'
    },
    {
      avatar: 'assets/images/testimonial/c.jpg',
      quote: 'Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus.',
      author: 'Jane diaz'
    },
    // Add more testimonials as needed
  ];
}
