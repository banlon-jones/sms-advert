import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  // tslint:disable-next-line:typedef
  get signinFormControl() {
    return this.signinForm.controls;
  }

  onSubmit(): void{
    if (!this.signinForm.invalid){
      const{email, password} = this.signinForm.value;
      this.authService.signIn(email, password);
    }
  }

}
