import { AddressBook } from './core/models/address-book';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private pTitle = 'addressBook';
  private pSubTitle = 'Another beautifull address book';

  private addresses: AddressBook[];

  public constructor() {
    this.addresses = [];
  }

  public ngOnInit(): void {
    let item: AddressBook = new AddressBook();
    item.lastName = 'Aubert';
    item.firstName = 'Jean-Luc';
    item.email = 'jean-luc.a@ideafactory.fr';
    item.isPublic = true;

    this.addresses.push(item);

    item = new AddressBook();
    item.lastName = 'Martin';
    item.firstName = 'Paul';
    item.email = 'pm@test.fr';
    item.isPublic = false;

    this.addresses.push(item);

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

  public get addressList(): any[] {
    return this.addresses;
  }
}
