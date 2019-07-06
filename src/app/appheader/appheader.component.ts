import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  signOut(){
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl("/login");
  }

}
