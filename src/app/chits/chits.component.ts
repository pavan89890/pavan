import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chit } from '../model/chit';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-chits',
  templateUrl: './chits.component.html',
  styleUrls: ['./chits.component.css']
})
export class ChitsComponent implements OnInit {

  
  url:string="chits";
  noOfChits=36;
  noOfChitsPaid=0;
  totalChitAmount:number=180000;
  totalAmountPaid:number=0;

  constructor(private apiService:ApiService) { 
    this.get();
  }

  chit=new Chit();
  chits:Chit[]=[];
  
  ngOnInit() {
    
  }

  add(form:NgForm){
    this.chit.profit=this.chit.actualAmount-this.chit.paidAmount;
    if(this.chit.id){
      this.apiService.updateObject(this.chit.id,this.chit,this.url);
    }else{
      this.apiService.addObject(this.chit,this.url);
    }
    form.resetForm();
    this.get();
  }

  get(){
    this.totalAmountPaid=0;
    this.noOfChitsPaid=0;
    this.apiService.getOrderedObjects(this.url,"updatedOn","desc").then(result=>{
      this.chits=(result.map(x=>{
        this.totalAmountPaid+=x.payload.doc.data()['actualAmount'];
        this.noOfChitsPaid++;
        return {
          id:x.payload.doc.id,
          month:x.payload.doc.data()['month'],
          year:x.payload.doc.data()['year'],
          actualAmount:x.payload.doc.data()['actualAmount'],
          paidAmount:x.payload.doc.data()['paidAmount'],
          profit:x.payload.doc.data()['profit']
        }
      }));
     
    });
  }

  edit(chit:Chit){
    if(chit){
      this.chit=chit;
    }else{
      this.chit=new Chit();
    }
    
  }

  delete(id:string){
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteObject(id,this.url);
      this.get();
    }
  }

}
