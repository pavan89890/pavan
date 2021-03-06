import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { JobDetail } from '../model/job-detail';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  url:string="job-details"

  constructor(private apiService:ApiService) {
    
   }

  jobDetail=new JobDetail();
  jobDetails:JobDetail[]=[];
  
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

  get(){
    this.apiService.getOrderedObjects(this.url,"doj","desc")
    .then(result => {
      this.jobDetails=result.map(x=>{
        return {
          id:x.payload.doc.id,
          companyName:x.payload.doc.data()['companyName'],
          doj:x.payload.doc.data()['doj'],
          dol:x.payload.doc.data()['dol'],
          experience:this.getAge(this.stringToDate(x.payload.doc.data()['dol']),this.stringToDate(x.payload.doc.data()['doj']))
        }
      });
      this.dtTrigger.next();
    $('#jobDetailsTableId').DataTable().clear();
    $('#jobDetailsTableId').DataTable().destroy();
    })
    
  }

  add(form:NgForm){
    delete this.jobDetail.experience;

    if(this.jobDetail.id){
      this.apiService.updateObject(this.jobDetail.id,this.jobDetail,this.url);
    }else{
      this.apiService.addObject(this.jobDetail,this.url);
    }
    form.resetForm();
    this.get();
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

  edit(jobDetail:JobDetail){
    if(jobDetail){
      this.jobDetail=jobDetail;
    }else{
      this.jobDetail=new JobDetail();
    }
    
  }

  

  delete(id:string){
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteObject(id,this.url);
      this.get();
    }
  }

}
