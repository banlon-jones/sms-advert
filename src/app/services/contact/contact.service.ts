import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCurrentUser(): any{
    const  user = JSON.parse(<string> localStorage.getItem('user'));
    return user.uid;
    console.log(user.uid);
  }

  getMyContacts(): any {
    return this.angularFirestore.collection('contacts', ref => ref.where('uid', '==', this.getCurrentUser())).snapshotChanges();
  }

  getByCampaign(cid: string): any {
    return this.angularFirestore.collection('contacts', ref => ref.where('cid', '==', cid)).snapshotChanges();

  }

  getContact(id: string): any {
    return this.angularFirestore.collection('contacts').doc(id).valueChanges();
  }

  createContact( contact: any): any{
    return new Promise<any>(((resolve, reject) => {
      this.angularFirestore.collection('contacts').add({uid: this.getCurrentUser(), ...contact}).then(
        response => {}
      );
    }));
  }

  updateContact( campaign: any, id: string): any {
    return this.angularFirestore.collection('contacts').doc(id).update(campaign);
  }

  deleteContact(id: string): any{
    return this.angularFirestore.collection('contacts').doc(`${id}`).delete().then(
      response => {
        alert('contact successfully deleted');
      },
    );
  }
}
