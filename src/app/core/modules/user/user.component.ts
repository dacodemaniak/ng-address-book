import { UserService } from './services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public loginFormGroup: FormGroup;

  public loginFailed = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  // Getter / Setters on form controls
  public get login(): AbstractControl {
    return this.loginFormGroup.controls.login;
  }

  public toggleErrorMessage(): void {
    this.loginFailed = false;
  }

  public get password(): AbstractControl {
    return this.loginFormGroup.controls.password;
  }

  public doSubmit(): void {
    this.userService.authenticate(this.loginFormGroup.value);
    if (this.userService.isAuthenticated()) {
      // @todo Route to address list
      this.router.navigate(['/address-list']);
    } else {
      // @todo clear form, toast a message, stay here
      this.loginFormGroup.reset();
      this.loginFailed = true;

    }
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: [
        '', // Default value
        Validators.compose(
          [Validators.required, Validators.minLength(8)]
        )
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

}
