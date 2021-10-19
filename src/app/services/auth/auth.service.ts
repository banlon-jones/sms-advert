import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseApp} from '@angular/fire';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth: AngularFireAuth,
              private firebase: FirebaseApp,
              private route: Router) { }

  createNewUser(email: string, password: string, name: string): any {
    this.fbAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.sendVerificationEmail();
        // @ts-ignore
        this.firebase.auth().currentUser.updateProfile({displayName: name}).then(
          () => {
            this.route.navigate(['/signin']);
          }
        );
      }
    );
  }

  sendVerificationEmail(): void{
    // @ts-ignore
    this.firebase.auth().currentUser.sendEmailVerification().then(() => {
      alert('verification email sent');
    }).catch((error) => {
      console.log(error);
    });
  }

  signIn(email: string, password: string): any{
    this.fbAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        const user = this.getUser();
        if (user.emailVerified) {
          this.setUserDate(user);
          this.route.navigate(['/home']);
        }else {
          alert('Sorry you can not login please verify your account');
        }
      }
    ).catch((error) => {
      alert(error.message);
    });
  }

  getUser(): any{
    const user = this.firebase.auth().currentUser;
    return user;
  }

  setUserDate(user: any): void{
    const userModel = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    };
    localStorage.setItem('user', JSON.stringify(userModel));
  }

  resetPassword(email: string): void{
    this.firebase.auth().sendPasswordResetEmail(email).then(() => {
      // password reset email sent!
      alert('Password reset email sent');
      this.route.navigate(['/signin']);
    }).catch((error) => {
      console.log(error);
    });
  }

  signout(): void{
    this.firebase.auth().signOut().then(() => {
      localStorage.removeItem('user');
      this.route.navigate(['/']);
    }).catch((error) => {
      console.log(error);
    });
  }

  isLoggedIn(): boolean {
    if (JSON.parse(<string> localStorage.getItem('user')) !== null){
      return true;
    }
    return false;
  }
}
