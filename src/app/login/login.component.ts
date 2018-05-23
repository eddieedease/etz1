import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';


declare var $: any;

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
    // scroll to top
    $('html,body').scrollTop(0);
  }


  loginAttempt() {
    if (this.usrPwd === '') {
      this.errorMsg = true;
    } else {
      $('#exampleModal').modal('hide');
      this.thisrouter.navigate(['/', 'test']);
    }
  }

}
