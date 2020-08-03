import { AddressBook } from './../../models/address-book';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input() address: AddressBook;

  constructor() { }

  ngOnInit(): void {
  }

  public changeLastName(): void {
    this.address.lastName = 'Casper';
  }
}
