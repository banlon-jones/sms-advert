import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any;
  submitted = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(4), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(5), Validators.required]),
      terms: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  get signupFormControl() {
    return this.signupForm.controls;
  }

  onSubmit(): void{
    if (!this.signupForm.invalid && this.signupForm.value.terms){
      const {name, email, password} = this.signupForm.value;
      this.authService.createNewUser(email, password, name);
    }
  }

}
