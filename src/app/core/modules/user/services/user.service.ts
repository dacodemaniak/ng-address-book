import { Router } from '@angular/router';
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

  constructor(
    private router: Router
  ) { }

  public authenticate(user: UserInterface): void {
    this.user = this.userList.find(
      (obj: UserInterface) => obj.login === user.login && obj.password === user.password
    );

    // Persist datas in localStorage
    if (this.user !== undefined) {
      localStorage.setItem('user', this.user.login + '.' + this.user.password);
    }
  }

  public logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const userString: string = localStorage.getItem('user');

    if (userString) {
      this.user = {};
      const userParts = userString.split('.');
      this.user.login = userParts[0];
      this.user.password = userParts[1];
    }
    return this.user && this.user !== undefined ? true : false;
  }
}
