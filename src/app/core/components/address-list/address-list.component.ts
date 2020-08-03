import { AddressService } from './../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { AddressBook } from '../../models/address-book';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  private addresses: AddressBook[];

  constructor(
    private addressService: AddressService
  ) {
    this.addresses = [];
  }

  ngOnInit(): void {
    this.addresses = this.addressService.all();
  }

  public get addressList(): any[] {
    return this.addresses;
  }

}
