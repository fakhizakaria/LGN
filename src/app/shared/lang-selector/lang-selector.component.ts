import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent {
  logoImagePath: string = 'assets/images/connaissance.png';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en'); 
  }

  selectedLanguage: string = 'English';
  showLanguageOptions: boolean = false;
  availableLanguages: string[] = ['English', 'French', 'Portugal', 'Italy']; 
  
  getLanguageCode(lang: string): string {
    switch (lang) {
      case 'English':
        return 'en';
      case 'French':
        return 'fr';
      case 'Portugal':
        return 'pt';
      case 'Italy':
        return 'it';
      default:
        return 'en';
    }
  }

  onLanguageSelectorClick(): void {
    this.showLanguageOptions = !this.showLanguageOptions;
  }

  selectLanguage(event: Event, lang: string): void {
    event.stopPropagation(); 
    this.selectedLanguage = lang;
    const langCode = this.getLanguageCode(lang);
    this.translate.use(langCode);
    this.showLanguageOptions = false;
  }
}
