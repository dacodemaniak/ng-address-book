import { AddressBookInterface } from '../interfaces/address-book-interface';

export class AddressBook implements AddressBookInterface {
  public id: number;
  public lastName: string;
  public firstName: string;
  public phoneNumber: string;
  public email: string;
  public isPublic: boolean;
}
