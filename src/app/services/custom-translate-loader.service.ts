import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(language: string): Observable<any> {
    const url = `https://lgn-translate.s3.eu-north-1.amazonaws.com/${language}.json`;
    return this.http.get(url);
  }
}
