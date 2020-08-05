import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressBook } from '../models/address-book';
import { take, tap, map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addresses: AddressBook[];
  private addressesSubject: BehaviorSubject<AddressBook[]> = new BehaviorSubject<AddressBook[]>([]);
  public addressList = this.addressesSubject.asObservable();

  constructor(
    private httpClient: HttpClient
  ) {
    this.all();
  }

  public all(): void {
    const api = `${environment.apiRoot}address`;

    this.httpClient.get<AddressBook[]>(
      api
    ).pipe(
      take(1), // First and only one result
      tap((response) => {
        console.log(`From service : ${response}`);
      }),
      map((response) => {
        this.addressesSubject.next(response);
      })
    ).subscribe();
  }

  public find(id: number): void {
    const api = `${environment.apiRoot}address/${id}`;
    this.httpClient.get<AddressBook>(
      api
    ).pipe(
      take(1),
      map((response) => {
        this.addressesSubject.next([response]);
      })
    ).subscribe();
  }

  public findByName(name: string): void {
    const api = `${environment.apiRoot}address/${name}`;
    this.httpClient.get<AddressBook[]>(
      api
    ).pipe(
      take(1),
      tap((response) => {
        console.log('Whats : ' + response);
      }),
      map((response) => {
        console.log('From service findByName : ' + response);
        this.addressesSubject.next(response);
      })
    ).subscribe();
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
