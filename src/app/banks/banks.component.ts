import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Bank } from '../model/bank';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  url: string = "banks"

  constructor(private apiService: ApiService) { }

  bank = new Bank();
  banks: Bank[] = [];
  totalBalance: number = 0;

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

  add(form: NgForm) {

    if (this.bank.id) {
      this.apiService.updateObject(this.bank.id, this.bank, this.url);
    } else {
      this.apiService.addObject(this.bank, this.url);
    }
    form.resetForm();
    this.get();
  }

  get() {
    this.totalBalance=0;
    this.apiService.getOrderedObjects(this.url,"balance","desc").then(result => {
      this.banks = (result.map(x => {
        this.totalBalance += x.payload.doc.data()['balance'];
        return {
          id: x.payload.doc.id,
          name: x.payload.doc.data()['name'],
          balance: x.payload.doc.data()['balance']
        }
      }));
      this.dtTrigger.next();
      $('#tableId').DataTable().clear();
      $('#tableId').DataTable().destroy();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.apiService.dtTrigger.unsubscribe();
  }

  edit(bank: Bank) {
    if (bank) {
      this.bank = bank;
    } else {
      this.bank = new Bank();
    }

  }



  delete(id: string) {
    if (confirm("Are you sure you want to delete?")) {
      this.apiService.deleteObject(id, this.url);
      this.get();
    }
  }

}
