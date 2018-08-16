import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  EdserService
} from '../edser.service';


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
  errorMsg2 = false;
  // loading visible view
  loading = false;

  constructor(private thisrouter: Router, private serCred: EdserService) {}

  ngOnInit() {
    // scroll to top
    $('html,body').scrollTop(0);
  }


  loginAttempt() {
    if (this.usrPwd === '') {
      this.errorMsg = true;
    } else {
      this.loading = true;
    this.serCred.API_login(this.usrPwd).subscribe(value => this.gotLogin(value));
    }
  }

 
  gotLogin(_val) {
    this.serCred.debugLog(_val);
    this.loading = false;
    // Check if response exist
    if (_val[0]) {
      if (_val[0].status === '1') {
        $('#exampleModal').modal('hide');
        this.serCred.currentGroupID = _val[0].id;
        this.serCred.__loggedIn = true;
        this.thisrouter.navigate(['/', 'test']);
      } else if (_val[0].status === '0') {
        this.errorMsg2 = true;
      }
   
    }  else {
      this.errorMsg = true;
    }
  }

}
