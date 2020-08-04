import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  // Getter / Setters on form controls
  public get login(): AbstractControl {
    return this.loginFormGroup.controls.login;
  }

  public get password(): AbstractControl {
    return this.loginFormGroup.controls.password;
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
