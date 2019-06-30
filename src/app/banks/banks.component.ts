import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Bank } from '../model/bank';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
  
  url:string="banks"

  constructor(private apiService:ApiService) { }

  bank=new Bank();
  banks:Bank[]=[];
  
  ngOnInit() {
    this.get();
  }

  add(form:NgForm){
    
    if(this.bank.id){
      this.apiService.updateObject(this.bank.id,this.bank,this.url);
    }else{
      this.apiService.addObject(this.bank,this.url);
    }
    form.resetForm();
    this.get();
  }

  get(){
    this.apiService.getObjects(this.url).then(result=>{
      this.banks=(result.map(x=>{
        return {
          id:x.payload.doc.id,
          name:x.payload.doc.data()['name'],
          balance:x.payload.doc.data()['balance']
        }
      }));
    });
  }

  edit(bank:Bank){
    if(bank){
      this.bank=bank;
    }else{
      this.bank=new Bank();
    }
    
  }

  

  delete(id:string){
    this.apiService.deleteObject(id,this.url);
    this.get();
  }

}
