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
  ToastrService
} from 'ngx-toastr';
import {
  EdserService
} from '../edser.service';

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

  // forms vars
  groupName = '';
  pasKey = '';

  currentGroup = '';

  // start with empty rows, columns are taken care of in the html
  rows = [
    // { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    // { name: 'Dany', gender: 'Male', company: 'KFC' },
    // { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];


  showScore = false;
  // columns = [
  //   { prop: 'name' },
  //   { name: 'Gender' },
  //   { name: 'Company' }
  // ];

  constructor(private thisrouter: Router, private serCred: EdserService, private toastr: ToastrService) {

  }

  ngOnInit() {
    $('html,body').scrollTop(0);

    // Check if admin is logged in
    $('#adminModal').modal('show', {backdrop: 'static', keyboard: false});
  }



  loginAttempt() {
    if (this.admnPwd === '') {
      this.errorMsg = true;
    } else {
      this.loading = true;
      this.serCred.API_admnlogin(this.admnPwd).subscribe(value => this.gotLogin(value));
    }
  }

  gotLogin(_val) {
    this.loading = false;
    // Check if response exist
    if (_val[0]) {
      this.adminLogged = true;
      // TODO: Set some service variables over here
      $('#adminModal').modal('hide');
      this.serCred.API_getgroups().subscribe(value => this.gotGroups(value));
    } else {
      // something wrong with credentials
      this.errorMsg = true;
    }
  }

  showResult(_id) {
    this.showScore = !this.showScore;

    this.rows.forEach(element => {

      if (_id === element.id) {
        this.currentGroup = element.name;
      }
    });

    
    
  }


  showEdit(_id) {
    this.serCred.debugLog(_id);
    this.rows.forEach(element => {

      if (_id === element.id) {
        this.groupName = element.name;
        this.pasKey = element.paskey;
      }
    });
  }

  printResult() {
    window.print();
  }

  publishToggle(_id, _status) {
    console.log(_status);

    let statchangenumb;
    switch (_status) {
      case true:
      statchangenumb = 1;
        break;
      case false:
      statchangenumb = 0;
        break;
    }

    // TODO: make changing call
    
    this.serCred.API_statusChange(_id, statchangenumb).subscribe(value => this.gotStatusChange(value));
    this.loading = true;
  }

  gotStatusChange(_value) {
    this.serCred.debugLog(_value);
    this.serCred.API_getgroups().subscribe(value => this.gotGroups(value));
  }

  gotGroups(_val) {
    this.serCred.debugLog(_val);

    // Ok, so we parse the boolean string to an int for the checkbox
    _val.forEach(function (value) {
      console.log(value.status);
      value.status = parseInt(value.status, 10);
    });

    this.rows = _val;
    this.loading = false;
  }



  makeGroup() {
    // TODO: is everything filled in? if so continue
    if (this.groupName !== '' || this.pasKey !== '') {
      this.serCred.API_addgroup(this.groupName, this.pasKey).subscribe(value => this.addedGroup(value));
      this.loading = true;
    } else {
      this.toastr.warning('Niet alle velden ingevuld', '');
    }
  }

  // response from service
  addedGroup(_value) {
    this.serCred.debugLog(_value);
    this.groupName = '';
    this.pasKey = '';
    this.loading = false;
    // Refetch the groups
    this.serCred.API_getgroups().subscribe(value => this.gotGroups(value));
  }

  editGroup() {
    // TODO: is everything filled in? if so continue
    if (this.groupName !== '' || this.pasKey !== '') {

    } else {

      this.toastr.warning('Veld mag niet leeg zijn', '');
    }
  }

}
