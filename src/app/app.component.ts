import { LocalizationService } from './core/services/localization.service';
import { Router, ActivatedRoute, UrlSegment, NavigationEnd } from '@angular/router';
import { UserService } from './core/modules/user/services/user.service';
import { AddressBook } from './core/models/address-book';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private pTitle = 'addressBook';
  private pSubTitle = 'Another beautifull address book';
  public url: string;
  public _language: string;
  public eventRouterSubscriber: Subscription;

  public constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router,
    private localizationService: LocalizationService
  ) {}

  public get language(): string {
    return this._language;
  }

  public set language(lang: string) {
    this._language = lang;
    console.log(lang);
    this.localizationService.language = this._language;
  }

  public ngOnInit(): void {
    this.eventRouterSubscriber = this.router.events.subscribe((result) => {
      if (result instanceof NavigationEnd) {
        // Only after navigation ended
        this.url = result.urlAfterRedirects;
        console.log('Current url : ' + result.url);
      }
    });
  }

  public ngOnDestroy(): void {
    // Unsubscribe all subscribers
    this.eventRouterSubscriber.unsubscribe();
  }

  public switcher(event): void {
    console.log(event);
    this.localizationService.language = this.language;
  }

  public changeTitle(): void {
    this.pTitle = 'My Address Book';
  }

  // Specific getter Typescript
  public get title(): string {
    return this.pTitle;
  }

  public get subTitle(): string {
    return this.pSubTitle;
  }

  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  public isLoginUp(): boolean {
    return this.url && this.url === '/login';
  }
}
