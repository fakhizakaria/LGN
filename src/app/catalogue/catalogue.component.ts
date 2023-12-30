import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface CatalogueSection {
  title: string;
  description: string;
  images: string[];
  showMore: boolean;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  annabellaImagePath: string = 'assets/images/ana.PNG';

  sections: CatalogueSection[] = [
    {
      title: 'São Miguel Island',
      description: 'Explore our e-learning journey, where language mastery intertwines with São Miguel\'s stunning landscapes. Feel the island\'s whispers as language merges with its natural symphony, inviting you to learn amidst this Azorean paradise.',
      images: [
        'assets/images/catalogues/sm/a.jpg',
        'assets/images/catalogues/sm/b.jpg',
        'assets/images/catalogues/sm/c.jpg',
        'assets/images/catalogues/sm/d.jpg',
        'assets/images/catalogues/sm/e.jpg',
      ],
      showMore: false // Initially hiding additional images
    },
    {
      title: 'Lisbon',
      description: 'Lisbon is a beautiful city known for its vibrant culture and stunning architecture.',
      images: [
        'assets/images/catalogues/pexels-chirill-ceban-15259457.jpg',
        'assets/images/catalogues/pexels-philippe-serrand-14142377.jpg',
        'assets/images/catalogues/pexels-jo-kassis-10591247.jpg',
        'assets/images/catalogues/pexels-josh-hild-2422483.jpg',
        'assets/images/catalogues/pexels-kaichieh-chan-917510.jpg',
        'assets/images/catalogues/pexels-max-avans-5069527.jpg',
        'assets/images/catalogues/pexels-philippe-serrand-14142377.jpg',
        'assets/images/catalogues/pexels-pixabay-236973.jpg',
        'assets/images/catalogues/pexels-spencer-gurley-films-1448055.jpg',
        'assets/images/catalogues/pexels-susanne-jutzeler-sujufoto-1292006.jpg',
      ],
      showMore: false // Initially hiding additional images
    },
    // Add more sections as needed
  ];

  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
  }

  toggleShowMore(section: CatalogueSection): void {
    section.showMore = !section.showMore;
  }
}
