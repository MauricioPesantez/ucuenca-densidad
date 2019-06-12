import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore'
import { TamanoLoteInterface } from 'app/models/tamanoLoteInterface';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore:AngularFirestore) {   
      this.tamLotesCollection = firestore.collection<TamanoLoteInterface>("tamLote120");
      this.tamLotes = this.tamLotesCollection.valueChanges();
  }
  private tamLotesCollection: AngularFirestoreCollection<TamanoLoteInterface>;
  private tamLotes:Observable<TamanoLoteInterface[]>

  getAllTamLotes(){

    return this.tamLotes = this.tamLotesCollection.snapshotChanges().pipe(map(changes=>{
      return changes.map(action=>{
        const data = action.payload.doc.data() as TamanoLoteInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }
  
}
 