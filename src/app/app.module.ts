import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
// ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GoogleCalendarService } from './services/google-calendar.service';
import { LgnKidsComponent } from './lgn-kids/lgn-kids.component';
import { LgnadultsComponent } from './lgnadults/lgnadults.component';
import { LgnteensComponent } from './lgnteens/lgnteens.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUSComponent,
    EventsComponent,
    CatalogueComponent,
    AboutMeComponent,
    LgnKidsComponent,
    LgnadultsComponent,
    LgnteensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [GoogleCalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
