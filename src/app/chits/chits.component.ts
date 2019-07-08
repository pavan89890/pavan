import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chit } from '../model/chit';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';


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
    
  }

  chit=new Chit();
  chits:Chit[]=[];
  
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  ngOnInit() {
    
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
    this.get();
  }

  add(form:NgForm){
    this.chit.profit=this.chit.actualAmount-this.chit.paidAmount;

    this.chit.paidOn=new Date('1-'+this.chit.month+'-'+this.chit.year+'');

    console.log(this.chit.paidOn);

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
    this.apiService.getOrderedObjects(this.url,"paidOn","desc").then(result=>{
      this.chits=(result.map(x=>{
        this.totalAmountPaid+=x.payload.doc.data()['actualAmount'];
        this.noOfChitsPaid++;
        return {
          id:x.payload.doc.id,
          month:x.payload.doc.data()['month'],
          year:x.payload.doc.data()['year'],
          actualAmount:x.payload.doc.data()['actualAmount'],
          paidAmount:x.payload.doc.data()['paidAmount'],
          profit:x.payload.doc.data()['profit'],
          paidOn:x.payload.doc.data()['paidOn']
        }
      }));
      this.dtTrigger.next();
      $('#tableId').DataTable().clear();
      $('#tableId').DataTable().destroy();
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
