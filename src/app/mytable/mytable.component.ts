import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact';
import { Page } from '../model/page';
import { filter } from 'minimatch';

@Component({
  selector: 'app-mytable',
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css']
})
export class MytableComponent implements OnInit {

  constructor() { }

  contacts:Contact[]=[];

  data:Contact[]=[];
  pages:Page[]=[];
  pageLength:number=2;
  totalRecords:number=0;
  fromRecord:number=0;
  toRecord:number=0;
  isFirstClicked:boolean=true;
  currentPage:Page;

  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    for(var i=1;i<=10;i++){
      let contact:Contact={id:""+i,name:"name "+i,mobile:8985489890+i,createdOn:new Date(),updatedOn:new Date()};
      this.contacts.push(contact);
    }
    this.totalRecords=this.contacts.length;
    this.lengthChanged();
    this.generatePages();
  }

  generatePages(){
    this.pages=[];
    for(var i=0;i<(Math.ceil(this.totalRecords/this.pageLength));i++){
      let page:Page={pageNo:i+1,isActive:false};
      this.pages.push(page);
    }
    this.currentPage=this.pages[0];
  }

  lengthChanged(){
    this.fromRecord=0;
    this.toRecord=this.pageLength;
    this.data=this.contacts.slice(this.fromRecord,this.toRecord);
    this.generatePages();
  }

  pageChanged(page:Page){
    let pageNo=page.pageNo;
    if(pageNo==1){
    }
    if(pageNo>0){
      pageNo=parseInt(pageNo+"");
      this.currentPage=page;
      this.fromRecord=(this.currentPage.pageNo-1)*this.pageLength;
      this.toRecord=parseInt(this.fromRecord+"")+parseInt(this.pageLength+"");
      this.data=this.contacts.slice(this.fromRecord,this.toRecord);
      page.isActive=true;
    }
  }

  lastPage(){
    this.fromRecord=this.totalRecords-this.pageLength;
    this.toRecord=this.totalRecords;
    this.data=this.contacts.slice(this.fromRecord,this.toRecord);
  }

  previousPage(){
    let page=this.pages[this.currentPage.pageNo-2];
    this.pageChanged(page);
  }

  nextPage(){
    let page=this.pages[this.currentPage.pageNo];
    this.pageChanged(page);
  }

  filterColumn($event,columnName:string){
    this.data=this.filterTable(this.data,columnName,$event.target.value);
  }

  filterTable(data:any,columnName:string,columnValue:string){
    let filteredData:any=[];
     filteredData = data.filter(function(itm){
      return itm.name.indexOf(columnValue) > -1;
    });
    return filteredData;
  }

}
