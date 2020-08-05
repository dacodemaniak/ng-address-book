import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressBook } from '../models/address-book';
import { take, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addresses: AddressBook[];

  constructor(
    private httpClient: HttpClient
  ) {
    this.addresses = [];
  }

  public all(): Observable<AddressBook[]> {
    const api = `${environment.apiRoot}address`;

    return this.httpClient.get<AddressBook[]>(
      api
    ).pipe(
      take(1), // First and only one result
      tap((response) => {
        console.log(`From service : ${response}`);
      }),
      map((response) => {
        return response;
      })
    );
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

    // Persists datas in localStorage
    localStorage.setItem('addresses', JSON.stringify(this.addresses));
  }
}
