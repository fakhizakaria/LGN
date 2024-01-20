import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  annabellaImagePath: string = 'assets/images/ana.PNG';
  constructor(private translate: TranslateService) {}
  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

}
