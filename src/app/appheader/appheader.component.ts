import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    $("body").addClass('skin-purple sidebar-mini');
    $("body").css("background-color","black");
  }

  signOut(){
    localStorage.removeItem("currentUser");
    this.router.navigateByUrl("/login");
  }

}
