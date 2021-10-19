import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCurrentUser(): any{
    const  user = JSON.parse(<string> localStorage.getItem('user'));
    return user.uid;
    console.log(user.uid);
  }

  getMyCampaign(): any{
    return this.angularFirestore.collection('campaigns', ref => ref.where('uid', '==', this.getCurrentUser())).snapshotChanges();
  }

  getCampaign(id: string): any{
    return this.angularFirestore.collection('campaigns').doc(id).valueChanges();
  }

  createCampaign( campaign: any): any{
    return new Promise<any>(((resolve, reject) => {
      this.angularFirestore.collection('campaigns').add({uid: this.getCurrentUser(), ...campaign}).then(
        response => {}
      );
    }));
  }

  updateCampaign( campaign: any, id: string): any {
    return this.angularFirestore.collection('campaigns').doc(id).update(campaign);
  }

  deleteCampaign(id: string): any{
    return this.angularFirestore.collection('campaigns').doc(`${id}`).delete().then(
      response => {
        alert('ticket successfully deleted');
      },
    );
  }
}
