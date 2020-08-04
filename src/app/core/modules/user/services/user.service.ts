import { Injectable } from '@angular/core';

interface UserInterface {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userList: UserInterface[] = [
    {
      login: 'jlaubert01',
      password: 'toto'
    }
  ];

  private user: any;

  constructor() { }

  public authenticate(user: UserInterface): void {
    this.user = this.userList.find(
      (obj: UserInterface) => obj.login === user.login && obj.password === user.password
    );
  }

  public logout(): void {
    this.user = null;
  }

  public isAuthenticated(): boolean {
    return this.user && this.user !== undefined ? true : false;
  }
}
