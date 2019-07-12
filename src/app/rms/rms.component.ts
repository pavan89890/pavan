import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Rms } from '../model/rms';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
import 'datatables.net'
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-rms',
  templateUrl: './rms.component.html',
  styleUrls: ['./rms.component.css']
})
export class RmsComponent implements OnInit,AfterViewInit {
  
  url: string = "rms";
  
  constructor(private apiService: ApiService) { }

  rms = new Rms();
  rmss: Rms[] = [];
  
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  dtOptions: any = {};

  ngOnInit() {
    this.dtOptions= {
      pagingType: 'full_numbers',
      processing:true,
      dom: 'Blfrtip',
      buttons: [
        'copy',
        'print',
        'excel',
        'pdf'
      ]
    };
    this.get();
  }

  ngAfterViewInit(): void {
    
     
    $('#tableId tfoot th').each( function (i) {
      var title = $('#tableId tfoot th').eq( $(this).index() ).text();
      $(this).html( '<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
    } );

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          if (that.search() !== this['value']) {
            that
              .search(this['value'])
              .draw();
          }
        });
      });
    });
  }

  

  add(form: NgForm) {

    if (this.rms.id) {
      this.apiService.updateObject(this.rms.id, this.rms, this.url);
    } else {
      this.apiService.addObject(this.rms, this.url);
    }
    form.resetForm();
    this.get();
  }

  get() {
    // this.apiService.getOrderedObjects(this.url,"createdOn","desc").then(result => {
    //   this.rmss = (result.map(x => {
    //     return {
    //       id: x.payload.doc.id,
    //       ...x.payload.doc.data()
    //       }
    //   }));
    //   this.dtTrigger.next();
    //   $('#tableId').DataTable().clear();
    //   $('#tableId').DataTable().destroy();
    // });
    this.getTestData();
  }

  edit(rms: Rms) {
    console.log(rms);
    if (rms) {
      this.rms = rms;
    } else {
      this.rms = new Rms();
    }

  }

  delete(id: string) {
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteObject(id, this.url);
      this.get();
    }
  }

  addTestData(){
    for(var i=1;i<=1000;i++){
      let data;

      data={
        empId:'emp id '+i,
        name:'name '+i,
        email:'email '+i,
        mobile:'mobile '+i,
        franchise:'franchise '+i,
        group:'group '+i,
        religion:'religion '+i,
        certificate:'certificate '+i,
        skillMatrix:'skill matrix text '+i,
        calendar:'calendar '+i,
        category:'category '+i,
        status:'status '+i,
        createdOn:Date,
        updatedOn:Date
      }

      this.rms=data;
      this.apiService.addObject(this.rms, this.url);
    }

    this.get();
  }

  getTestData():void{

    for(var i=1;i<=1000;i++){
      let data;

      data={
        id:i,
        empId:'emp id '+i,
        name:'name '+i,
        email:'email '+i,
        mobile:'mobile '+i,
        franchise:'franchise '+i,
        group:'group '+i,
        religion:'religion '+i,
        certificate:'certificate '+i,
        skillMatrix:'skill matrix text '+i,
        calendar:'calendar '+i,
        category:'category '+i,
        status:'status '+i,
        createdOn:new Date(),
        updatedOn:new Date()
      }

      this.rms=data;
      this.rmss.push(this.rms);
    }
  }
}
