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

  constructor(private http_: Http, private router: Router) { }

  debugLog(logging: any) {
    if (environment.production !== true) {
      console.log(logging);
    }
    //
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
}
