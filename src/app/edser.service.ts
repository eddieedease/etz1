import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http';
import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Subject
} from 'rxjs/Subject';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throttleTime';

// import evironment for current dev bunlde
import {
  environment
} from '../environments/environment';

@Injectable()
export class EdserService {


  // service/store variables
  groupLink;
  groupName;

  // a var for keeping if one is logged in, switch when succesfully logged in. Keep track in other components
  __loggedIn = false;

  currentGroupID;

  constructor(private http_: Http, private router: Router) { }

  debugLog(logging: any) {
    if (environment.production !== true) {
      console.log(logging);
    }
  }



  // API CALLSSSSSSS
  // GET COURSE ITEM
  API_login(_pwd): Observable < any > {
    const url = environment.apilink + 'login/' + _pwd + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


   // API CALLSSSSSSS
  // GET COURSE ITEM
  API_admnlogin(_pwd): Observable < any > {
    const url = environment.apilink + 'admnlogin/' + _pwd + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }

  // API CALL
  // SUBMIT result, needs groupID ,and results
  API_formsubmit(_groupid, _res1, _res2, _res3, _res4, _res5): Observable < any > {
    // tslint:disable-next-line:max-line-length
    const url = environment.apilink + 'formsubmit/' + _groupid + '/' + _res1 + '/' + _res2 + '/' + _res3 + '/' + _res4 + '/' + _res5 + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  // API CALLS GROUP MANAGEMENT
  // API CALL
  // GET GROUPS
   // API CALLSSSSSSS
  // GET ALL GROUPS
  API_getgroups(): Observable < any > {
    const url = environment.apilink + 'getgroups' + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  // GET GROUPS
  // API CALLSSSSSSS
  // ADD NEW GROUP. TAKES A NAME AND A PASKEY
  API_addgroup(_groupname, _groupkey): Observable < any > {
    const url = environment.apilink + '/makegroup/' + _groupname + '/' + _groupkey + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }


  // TOGGLING CHECKBOX OF ACTIVE
  API_statusChange(_groupid, _statusChange): Observable < any > {
    const url = environment.apilink + '/changestatus/' + _groupid + '/' + _statusChange + '?rnd=' + new Date().getTime();
    // tslint:disable-next-line:prefer-const
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({
      headers: headers
    });
    // tslint:disable-next-line:max-line-length
    return this.http_.get(url, options)
      .throttleTime(5000)
      .map(res => res.json());
  }

}
