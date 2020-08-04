import { Router, ActivatedRoute, UrlSegment, NavigationEnd } from '@angular/router';
import { UserService } from './core/modules/user/services/user.service';
import { AddressBook } from './core/models/address-book';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private pTitle = 'addressBook';
  private pSubTitle = 'Another beautifull address book';
  public url: string;


  public constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe((result) => {
      if (result instanceof NavigationEnd) {
        // Only after navigation ended
        this.url = result.urlAfterRedirects;
        console.log('Current url : ' + result.url);
      }
    });
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
    console.log('Check for url');
    return this.url && this.url === '/login';
  }
}
