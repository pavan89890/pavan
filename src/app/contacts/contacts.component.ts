import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ApiService } from '../services/api.service';
import { NgForm } from "@angular/forms/forms";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  contact:Contact=new Contact();
  contacts:Contact[]=[];
  url:string="contacts";

  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  ngOnInit() {
    this.get();
    this.dtOptions = {
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
  }

  add(form:NgForm){
    
    if(this.contact.id){
      this.apiService.updateObject(this.contact.id,this.contact,this.url);
    }else{
      this.apiService.addObject(this.contact,this.url);
    }
    form.resetForm();
    this.get();
  }

  get(){
    this.apiService.getObjects(this.url).then(response=>{
      this.contacts=(response.map(x=>{
        return {
          id:x.payload.doc.id,
          name:x.payload.doc.data()['name'],
          mobile:x.payload.doc.data()['mobile']
        }
      }));
      this.dtTrigger.next();
      $('#contactsTableId').DataTable().clear();
      $('#contactsTableId').DataTable().destroy();
    });
  }

  edit(contact:Contact){
    if(contact){
      this.contact=contact;
    }else{
      this.contact=new Contact();
    }
  }

  delete(id:string){
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteObject(id,this.url);
      this.get();
    }
  }

}
