import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TarifService {

  constructor(private angularFirestore: AngularFirestore) { }

  getTarifs(): any{
    const tarifs = this.angularFirestore.collection('tarifs').snapshotChanges();
    return tarifs;
  }

  getTatif(id: string): any{
    return this.angularFirestore.collection('tarifs').doc(id).valueChanges();
  }

  createTarif( tarif: any): any{
    return new Promise<any>(((resolve, reject) => {
      this.angularFirestore.collection('tarifs').add(tarif).then(
        response => {}
      );
    }));
  }

  updateTarif( tarif: any, id: string): any {
    return this.angularFirestore.collection('tarifs').doc(id).update(tarif);
  }

  deleteTarif(id: string): any{
    return this.angularFirestore.collection('tarifs').doc(`${id}`).delete().then(
      response => {
        alert('tarif successfully deleted');
      },
    );
  }
}
