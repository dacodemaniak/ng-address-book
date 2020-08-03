import { Injectable } from '@angular/core';
import { AddressBook } from '../models/address-book';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addresses: AddressBook[];

  constructor() {
    this.addresses = [];

    this.hydrate();
  }

  public all(): AddressBook[] {
    return this.addresses;
  }

  public find(id: number): AddressBook {
    const address: AddressBook = this.addresses.find(
      (obj) => obj.id === id
    );
    return address;
  }

  private hydrate(): void {
    let item: AddressBook = new AddressBook();
    item.id = 1;
    item.lastName = 'Aubert';
    item.firstName = 'Jean-Luc';
    item.email = 'jean-luc.a@ideafactory.fr';
    item.isPublic = true;

    this.addresses.push(item);

    item = new AddressBook();
    item.id = 2;
    item.lastName = 'Martin';
    item.firstName = 'Paul';
    item.email = 'pm@test.fr';
    item.isPublic = false;

    this.addresses.push(item);

  }
}
