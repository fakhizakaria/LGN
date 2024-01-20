import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logoImagePath: string = 'assets/images/feuilles.png';
  isMenuOpen: boolean = false;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('en');

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        // Close the menu when a route changes
        this.isMenuOpen = false;
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // Close the menu when the window is resized on small screens
    if (event.target.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }
}
