import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent {
  logoImagePath: string = 'assets/images/connaissance.png';
  showLanguageOptions: boolean = false;
  currentLanguage: string = 'English'; // Default to English

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  availableLanguages: string[] = ['English', 'French', 'Portuguese', 'Italian'];

  switchLanguage(event: Event, lang: string): void {
    event.stopPropagation(); 
    this.currentLanguage = lang;
    this.http.get(`https://lgn-translate.s3.eu-north-1.amazonaws.com/${this.getLanguageCode(lang)}.json`)
      .subscribe(translation => {
        this.translate.setTranslation(this.getLanguageCode(lang), translation);
        this.translate.use(this.getLanguageCode(lang));
      });
      this.showLanguageOptions = false;
  }

  getLanguageCode(lang: string): string {
    switch (lang) {
      case 'English':
        return 'en';
      case 'French':
        return 'fr';
      case 'Portuguese':
        return 'pt';
      case 'Italian':
        return 'it';
      default:
        return 'en';
    }
  }

  onLanguageSelectorClick(): void {
    this.showLanguageOptions = !this.showLanguageOptions;
  }

// Update the method to match the correct flag image names
getFlagImagePath(lang: string): string {
  return `assets/images/flags/flag_${lang.toLowerCase()}.png`;
}

}
