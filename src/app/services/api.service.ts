import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore:AngularFirestore) { }

  dtTrigger: Subject<any> = new Subject();
  dtOptions: any ={
    pagingType: 'full_numbers',
    jQueryUI: false,
    processing:true,
    dom: 'Bfrtip',
    buttons: [
      'copy',
      'print',
      'excel',
      'pdf'
    ]
  };
  
  renderDataTable(){
      this.dtTrigger.next();
      $('#tableId').DataTable().clear();
      $('#tableId').DataTable().destroy();
  }

  getObjects(url:string):any{
    
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection(url).snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })

  }

  getOrderedObjects(url:string,orderBy:string , direction:any):any{
    
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection(url, ref => ref.orderBy(orderBy,direction)).snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })

  }

  addObject(obj:any,url:string){
    obj.createdOn=new Date();
    obj.updatedOn=new Date();
    return this.firestore.collection(url).add(JSON.parse(JSON.stringify(obj)));
  }

  updateObject(id:string,obj:any,url:string){
    delete obj.id;
    obj.updatedOn=new Date();
    this.firestore.doc(url+"/"+id).update(obj);
  }

  deleteObject(id:string,url:string){
    this.firestore.doc(url+"/"+id).delete();
  }
}
