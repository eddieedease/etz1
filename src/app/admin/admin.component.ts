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
  currentGroupID;
  howManySend;

  // start with empty rows, columns are taken care of in the html
  rows = [
    // { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    // { name: 'Dany', gender: 'Male', company: 'KFC' },
    // { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];

  // Some list of bools which we can use for the styling
  vertrouwen1 = false;
  vertrouwen2 = false;
  vertrouwen3 = false;
  conflict1 = false;
  conflict2 = false;
  conflict3 = false;
  commitment1 = false;
  commitment2 = false;
  commitment3 = false;
  verantwoordelijk1 = false;
  verantwoordelijk2 = false;
  verantwoordelijk3 = false;
  resultaat1 = false;
  resultaat2 = false;
  resultaat3 = false;

  vertrouwen = 0;
  conflict = 0;
  commitment = 0;
  verantwoordelijk = 0;
  resultaat = 0;

  // tslint:disable-next-line:max-line-length


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
    $('#adminModal').modal('show', {
      backdrop: 'static',
      keyboard: false
    });
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
    // Frist of, reset all bool values for the result table
    this.vertrouwen1 = false;
    this.vertrouwen2 = false;
    this.vertrouwen3 = false;
    this.conflict1 = false;
    this.conflict2 = false;
    this.conflict3 = false;
    this.commitment1 = false;
    this.commitment2 = false;
    this.commitment3 = false;
    this.verantwoordelijk1 = false;
    this.verantwoordelijk2 = false;
    this.verantwoordelijk3 = false;
    this.resultaat1 = false;
    this.resultaat2 = false;
    this.resultaat3 = false;
    // adjust template view var
    this.showScore = !this.showScore;

    this.rows.forEach(element => {
      if (_id === element.id) {
        this.currentGroup = element.name;
      }
    });
    this.loading = true;
    this.serCred.API_getResults(_id).subscribe(value => this.gotResults(value));
  }

  gotResults(_val) {

     

    this.loading = false;
    this.serCred.debugLog(_val);
    this.howManySend = _val.length;

    // Calculate scores = total of each divided by howManySend
    let vertrouwen = 0;
    let conflict = 0;
    let commitment = 0;
    let verantwoordelijk = 0;
    let resultaat = 0;

    for (let index = 0; index < _val.length; index++) {
      vertrouwen = vertrouwen + parseFloat(_val[index].result1);
      conflict = conflict + parseFloat(_val[index].result2);
      commitment = commitment + parseFloat(_val[index].result3);
      verantwoordelijk = verantwoordelijk + parseFloat(_val[index].result4);
      resultaat = resultaat + parseFloat(_val[index].result5);
    }

    // Now round the numbers if is nessy
    // Math.round(vertrouwen * 100) / 100
    vertrouwen = vertrouwen / this.howManySend;
    vertrouwen =  Math.round(vertrouwen * 100) / 100;
    this.vertrouwen = vertrouwen;
    conflict = conflict / this.howManySend;
    conflict =  Math.round(conflict * 100) / 100;
    this.conflict = conflict;
    commitment = commitment / this.howManySend;
    commitment =  Math.round(commitment * 100) / 100;
    this.commitment = commitment;
    verantwoordelijk = verantwoordelijk  / this.howManySend;
    verantwoordelijk =  Math.round(verantwoordelijk * 100) / 100;
    this.verantwoordelijk = verantwoordelijk;
    resultaat = resultaat / this.howManySend;
    resultaat =  Math.round(resultaat * 100) / 100;
    this.resultaat = resultaat;

    this.serCred.debugLog(vertrouwen);
    this.serCred.debugLog(conflict);
    this.serCred.debugLog(commitment);
    this.serCred.debugLog(verantwoordelijk);
    this.serCred.debugLog(resultaat);
    
    // some ugly if else logic right there
    if (vertrouwen >= 3.75) {
      this.vertrouwen1 = true;
    } else if (vertrouwen < 3.75 && vertrouwen > 3.24) {
      this.vertrouwen2 = true;
    } else if (vertrouwen <= 3.24) {
      this.vertrouwen3 = true;
    }

    if (conflict >= 3.75) {
      this.conflict1 = true;
    } else if (conflict < 3.75 && conflict > 3.24) {
      this.conflict2 = true;
    } else if (conflict <= 3.24) {
      this.conflict3 = true;
    }

    if (commitment >= 3.75) {
      this.commitment1 = true;
    } else if (commitment < 3.75 && commitment > 3.24) {
      this.commitment2 = true;
    } else if (commitment <= 3.24) {
      this.commitment3 = true;
    }

    if (verantwoordelijk >= 3.75) {
      this.verantwoordelijk1 = true;
    } else if (verantwoordelijk < 3.75 && verantwoordelijk > 3.24) {
      this.verantwoordelijk2 = true;
    } else if (verantwoordelijk <= 3.24) {
      this.verantwoordelijk3 = true;
    }

    if (resultaat >= 3.75) {
      this.resultaat1 = true;
    } else if (resultaat < 3.75 && resultaat > 3.24) {
      this.resultaat2 = true;
    } else if (resultaat <= 3.24) {
      this.resultaat3 = true;
    }
  }

  showEdit(_id) {
    this.currentGroupID = _id;
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
    this.serCred.debugLog(this.pasKey);
    if (this.groupName !== '' || this.pasKey !== '') {
      this.serCred.API_editgroup(this.currentGroupID, this.groupName, this.pasKey).subscribe(value => this.groupEditted(value));
    } else {

      this.toastr.warning('Veld mag niet leeg zijn', '');
    }
  }

  groupEditted(_val) {
    this.toastr.success('Groep gewijzigd', '');
    this.serCred.API_getgroups().subscribe(value => this.gotGroups(value));
  }

}
