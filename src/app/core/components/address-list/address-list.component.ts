import { Observable, of } from 'rxjs';
import { AddressService } from './../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { AddressBook } from '../../models/address-book';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  private addresses: Observable<AddressBook[]>;

  constructor(
    private addressService: AddressService
  ) {
    this.addresses = null;
  }

  ngOnInit(): void {
    this.addressService.addressList.subscribe((response) => {
      console.log('Some subject response', response);
      this.addresses = of(response);
    });
  }
  /**
   * Call api /api/v2/address/[n] to get the entry that have [n] as id and display it
   */
  public filter(): any {
    this.addresses = this.addressService.find(1);
  }

  public get addressList(): Observable<AddressBook[]> {
    return this.addresses;
  }

}
