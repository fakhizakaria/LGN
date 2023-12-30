import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logoImagePath: string = 'assets/images/feuilles.png';
  isMenuOpen: boolean = false;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
