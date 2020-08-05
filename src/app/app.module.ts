
import { LocalizationService } from './core/services/localization.service';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './core/components/address/address.component';
import { AddAddressComponent } from './core/components/add-address/add-address.component';
import { AddressListComponent } from './core/components/address-list/address-list.component';
import { CustomButtonDirective } from './shared/directives/custom-button.directive';
import { UpperFirstLetterPipe } from './shared/pipes/upper-first-letter.pipe';

import { fakeBackendProvider } from './shared/services/fake-backend-interceptor';

// Sets some functions to load some resources
export function localizationInitializerFactory(
  translateService: TranslateService,
  localizationService: LocalizationService,
  injector: Injector
): any {
  return (): Promise<void> => {
    return localizationService.init(injector, translateService);
  };
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    '.json'
  );
}
@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    AddAddressComponent,
    AddressListComponent,
    CustomButtonDirective,
    UpperFirstLetterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: localizationInitializerFactory,
      deps: [
        TranslateService,
        LocalizationService,
        Injector
      ],
      multi: true
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
