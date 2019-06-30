import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
import { Fd } from '../model/fd';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fds',
  templateUrl: './fds.component.html',
  styleUrls: ['./fds.component.css']
})
export class FdsComponent implements OnInit {

  

  url:string="fds"

  constructor(private apiService:ApiService) {
    
   }

  fd=new Fd();
  fds:Fd[]=[];
  
  ngOnInit() {
    this.get();
  }

  add(form:NgForm){
    delete this.fd.rem;
    this.fd.matAmount=this.fd.amount + ((this.fd.amount * this.fd.roi) / 100);
    
    this.fd.matOn = new Date(this.fd.depOn);
    this.fd.matOn.setMonth(this.fd.matOn.getMonth() + this.fd.period);

    if(this.fd.id){
      this.apiService.updateObject(this.fd.id,this.fd,this.url);
    }else{
      this.apiService.addObject(this.fd,this.url);
    }
    form.resetForm();
    this.get();
  }

  get(){
    this.apiService.getObjects(this.url).then(result=>{
      this.fds=(result.map(x=>{
        return {
          id:x.payload.doc.id,
          bank:x.payload.doc.data()['bank'],
          amount:x.payload.doc.data()['amount'],
          roi:x.payload.doc.data()['roi'],
          matAmount:x.payload.doc.data()['matAmount'],
          depOn:this.getFormattedDate(x.payload.doc.data()['depOn']),
          period:x.payload.doc.data()['period'],
          matOn:this.getFormattedDate(x.payload.doc.data()['matOn']),
          rem: this.getAge(this.stringToDate(x.payload.doc.data()['matOn']), new Date()),
        }
      }));
    });
  }

  getFormattedDate(dateVal:string):String{
    return dateVal?new Date(dateVal).toDateString():null;
  }

  stringToDate(dateVal:string):Date{
    return dateVal?new Date(dateVal):null;
  }

  getAge(endDate: Date, startDate: Date): any {
    if(!endDate){
      endDate=new Date();
    }

    var y = endDate.getFullYear() - startDate.getFullYear();
    var m = endDate.getMonth() - startDate.getMonth();
    var d = endDate.getDate() - startDate.getDate();
    if (endDate.getMonth() < startDate.getMonth()) {
      y--;
      m = (endDate.getMonth() + 12) - startDate.getMonth();
    }
    if (endDate.getDate() < startDate.getDate()) {
      m--;
      d = (endDate.getDate() + 31) - startDate.getDate();
    }
    return y + " y, " + m + " m, " + d + " d";
  }

  edit(fd:Fd){
    if(fd){
      this.fd=fd;
    }else{
      this.fd=new Fd();
    }
    
  }

  

  delete(id:string){
    this.apiService.deleteObject(id,this.url);
    this.get();
  }


}
