import { Observable } from 'rxjs';
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
    this.addresses = this.addressService.all();
  }

  /**
   * Call api /api/v2/address/[n] to get the entry that have [n] as id and display it
   */
  public filter() {
    return null;
  }

  public get addressList(): Observable<AddressBook[]> {
    return this.addresses;
  }

}
