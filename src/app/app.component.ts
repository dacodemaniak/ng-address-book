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



  public constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  public ngOnInit(): void {

      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.url)
      ).subscribe((result) => {
        console.log(result);
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
    return true;
  }
}
