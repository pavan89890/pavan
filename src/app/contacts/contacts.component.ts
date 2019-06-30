import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { ApiService } from '../services/api.service';
import { NgForm } from "@angular/forms/forms";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  contact:Contact=new Contact();
  contacts:Contact[]=[];
  url:string="contacts"

  ngOnInit() {
    this.get();
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
    this.apiService.deleteObject(id,this.url);
    this.get();
  }

}
