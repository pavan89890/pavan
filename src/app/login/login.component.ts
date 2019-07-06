import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      });
     }

  ngOnInit() {
  }

  login(){
    if(this.form.valid && this.form.value.username=="pavan" && this.form.value.password=="java"){
      this.auth.sendToken(this.form.value.username)
      this.myRoute.navigate(["/dashboard"]);
    }
  }

}
