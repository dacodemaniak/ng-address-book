import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private _language: string;
  private translateService: TranslateService;

  constructor() { }

  public set language(language: string) {
    this._language = language;
    this.switchLanguage();
  }

  public init(
    injector: Injector,
    translateService: TranslateService
  ): Promise<void> {
    this.translateService = translateService;

    return new Promise<void>((resolve: any) => {
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        // LOCATION_INITIALIZED was fired... so, let's play with translations
        const navigatorLanguage: string = window.navigator.language;
        const userLanguage: string = navigatorLanguage.split('-')[0]; // fr-FR => fr

        this._language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'en';

        this.switchLanguage()
          .subscribe(() => {
            console.log(`Translations loaded from ${this._language}`);
            resolve(null);
          });
      });
      // Ici... On continue l'exécution...
    });
  }

  private switchLanguage(): Observable<any> {
    return this.translateService.use(this._language);
  }
}
