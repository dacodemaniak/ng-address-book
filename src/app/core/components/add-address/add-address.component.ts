import { AddressService } from './../../services/address.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressBook } from '../../models/address-book';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  private pAddress: AddressBook;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService
  ) { }

  public get address(): AddressBook {
    return this.pAddress;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const parameters: number = +paramMap.get('id');
      console.log(`id : ${parameters}`);
      this.pAddress = this.addressService.find(parameters);
    });
  }

}
