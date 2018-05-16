import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // store user pwd
  usrPwd = '';
  errorMsg = false;

  constructor(private thisrouter: Router) { }

  ngOnInit() {
  }


  loginAttempt() {
    if (this.usrPwd === '') {
      console.log('why');
      this.errorMsg = true;
    } else {
      this.thisrouter.navigate(['/', 'test']);
    }
  }

}
