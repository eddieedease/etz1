import { Component, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {


  // logging var
  adminLogged = false;
  // error message view
  errorMsg = false;
  // loading visible view
  loading = false;

  admnPwd = '';

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  constructor(private thisrouter: Router) {

   }

  ngOnInit() {
    $('html,body').scrollTop(0);

    // Check if admin is logged in
    $('#adminModal').modal('show');
  }


  loginAttempt() {
    if (this.admnPwd === '') {
      this.errorMsg = true;
    } else {
      this.adminLogged = true;
      $('#adminModal').modal('hide');
    }
  }

}
