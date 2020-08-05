import { AddressService } from './core/services/address.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LocalizationService } from './core/services/localization.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from './core/modules/user/services/user.service';
import { AddressBook } from './core/models/address-book';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
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
  public searchFormGroup: FormGroup;

  @Output() itemList: EventEmitter<Observable<AddressBook[]>> = new EventEmitter<Observable<AddressBook[]>>();

  public constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router,
    private localizationService: LocalizationService,
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ) {}

  public get language(): string {
    return this._language;
  }

  public set language(lang: string) {
    this._language = lang;
    console.log(lang);
    this.localizationService.language = this._language;
  }

  public get searchTerm(): AbstractControl {
    return this.searchFormGroup.controls.searchTerm;
  }

  public ngOnInit(): void {
    this.eventRouterSubscriber = this.router.events.subscribe((result) => {
      if (result instanceof NavigationEnd) {
        // Only after navigation ended
        this.url = result.urlAfterRedirects;
        console.log('Current url : ' + result.url);
      }
    });

    // Créer l'instance du groupe searchFormGroup
    this.searchFormGroup = this.formBuilder.group({
      searchTerm: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20)
        ])
      ]
    });

    // Listen for searchTerms updates
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(() => {
          console.log(`SearchTerm content ${this.searchTerm.value}`);
          this.doSearch();
        })
      ).subscribe();
  }

  private doSearch(): void {
    if (this.searchTerm.value.trim().length > 0) {
      this.addressService.findByName(this.searchTerm.value);
      console.log('Find an item from searchTerm');
    } else {
      console.log('Retreive all of address items');
      this.addressService.all();
    }
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
