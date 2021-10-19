import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  // tslint:disable-next-line:typedef
  get forgotPasswordFormControl() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit(): void{
    if (!this.forgotPasswordForm.invalid){
      const {email} = this.forgotPasswordForm.value;
      this.authService.resetPassword(email);
    }
  }

}
