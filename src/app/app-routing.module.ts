import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LgnteensComponent } from './lgnteens/lgnteens.component';
import { LgnadultsComponent } from './lgnadults/lgnadults.component';
import { LgnKidsComponent } from './lgn-kids/lgn-kids.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contact-us', component: ContactUSComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'events', component: EventsComponent},
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'aboutMe', component: AboutMeComponent},
  { path: 'lgn-teens', component: LgnteensComponent},
  { path: 'lgn-adults', component: LgnadultsComponent},
  { path: 'lgn-kids', component: LgnKidsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
