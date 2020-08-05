import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor() { }

  public init(
    injector: Injector,
    translateService: TranslateService
  ): Promise<void> {
    return new Promise<void>((resolve: any) => {
      injector.get(LOCATION_INITIALIZED, Promise.resolve(null)).then(() => {
        // LOCATION_INITIALIZED was fired... so, let's play with translations
        const navigatorLanguage: string = window.navigator.language;
        const userLanguage: string = navigatorLanguage.split('-')[0]; // fr-FR => fr

        const language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'en';

        translateService.use(language); // Use the navigator language to load translation

        resolve(null);
      });
      // Ici... On continue l'exécution...
    });
  }
}
