import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): any{
    this.user = JSON.parse(<string> localStorage.getItem('user'));
    console.log(this.user);
  }

  signout(): void{
    this.authService.signout();
    localStorage.removeItem('user');
  }

}
