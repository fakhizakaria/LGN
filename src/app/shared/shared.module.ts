import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { CtaSharedComponent } from './cta-shared/cta-shared.component';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { CustomTranslateLoader } from '../services/custom-translate-loader.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CtaSharedComponent,
    LangSelectorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader, // Use your custom loader here
        deps: [HttpClient],
      },
    }),  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CtaSharedComponent,
    LangSelectorComponent,
    TranslateModule
  ]
})
export class SharedModule { }
