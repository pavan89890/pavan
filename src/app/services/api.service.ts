import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore:AngularFirestore) { }

  getObjects(url:string):any{
    
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection(url).snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })

  }

  addObject(obj:any,url:string){
    return this.firestore.collection(url).add(JSON.parse(JSON.stringify(obj)));
  }

  updateObject(id:string,obj:any,url:string){
    delete obj.id;
    this.firestore.doc(url+"/"+id).update(obj);
  }

  deleteObject(id:string,url:string){
    this.firestore.doc(url+"/"+id).delete();
  }
}
