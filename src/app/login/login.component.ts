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
      // TODO: Set some service variables over here
      $('#exampleModal').modal('hide');
      this.thisrouter.navigate(['/', 'test']);
    } else {
      this.errorMsg = true;
    }
  }

}
