import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';

import {
  EdserService
} from '../edser.service';



declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  json;
  questionArray;

  whichempty;

  // var for finishing test
  testFinished = false;
  testProblem = false;


  // results of tests
  result1 = 0;
  result2 = 0;
  result3 = 0;
  result4 = 0;
  result5 = 0;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private http_: Http, private edSer: EdserService, private thisrouter: Router) {
    http_.get('assets/questions/questions5.json')
      .map(response => response.json())
      .subscribe(
        article => {
          // GET JSON Object --> change to array
          this.json = article;
          // console.log(this.json);
          this.questionArray = $.map(this.json, function (el) {
            return el;
          });
          console.log(this.questionArray);
        },
        error => console.error(error));
  }

  ngOnInit() {
    // scroll to top
    $('html,body').scrollTop(0);


    // first up, check if one is logged in via service var
    // if not, reroute to logging page
    if (this.edSer.__loggedIn === false){
      this.thisrouter.navigate(['/', 'login']);
    }
    
      
  }

  finishTest() {
    // TODO:  check if everything has been filled in
    let somethingempty = false;
    const whichemptyArray = [];

    this.result1 = 0;
    this.result2 = 0;
    this.result3 = 0;
    this.result4 = 0;
    this.result5 = 0;
    // make some logic for collecting test data, loop through questions
    for (let index = 0; index < this.questionArray.length; index++) {

      // tslint:disable-next-line:max-line-length
      if (this.questionArray[index].answer !== null && this.questionArray[index].answer !== undefined && this.questionArray[index].answer !== '') {
        console.log(this.questionArray[index].answer);
        switch (this.questionArray[index].type) {
          case 1:
            this.result1 = this.result1 + this.questionArray[index].answer;
            break;
          case 2:
            this.result2 = this.result2 + this.questionArray[index].answer;
            this.edSer.debugLog(this.result2);
            break;
          case 3:
            this.result3 = this.result3 + this.questionArray[index].answer;
            break;
          case 4:
            this.result4 = this.result4 + this.questionArray[index].answer;
            break;
          case 5:
            this.result5 = this.result5 + this.questionArray[index].answer;
            break;
        }
      } else {
        // Something is not filled in correctly
        somethingempty = true;
        whichemptyArray.push(index + 1);
      }
    }


    if (somethingempty === false) {
      // toggle feedback template view vars
      this.testFinished = true;
      this.testProblem = false;
      // everything is filled in and we are gonna send it through the API
      this.result1 = Math.round(this.result1 / 8 * 100) / 100;
      this.result2 = Math.round(this.result2 / 8 * 100) / 100;
      this.result3 = Math.round(this.result3 / 7 * 100) / 100;
      this.result4 = Math.round(this.result4 / 7 * 100) / 100;
      this.result5 = Math.round(this.result5 / 8 * 100) / 100;
      this.edSer.debugLog('Result 1: ' + this.result1);
      this.edSer.debugLog('Result 2: ' + this.result2);
      this.edSer.debugLog('Result 3: ' + this.result3);
      this.edSer.debugLog('Result 4: ' + this.result4);
      this.edSer.debugLog('Result 5: ' + this.result5);
      // tslint:disable-next-line:max-line-length
      this.edSer.API_formsubmit(this.edSer.currentGroupID, this.result1, this.result2, this.result3, this.result4, this.result5 ).subscribe(value => this.formSend(value));
    } else {
      // feedback to the user that something is empty
      this.edSer.debugLog('Not everything is filled in');
      this.edSer.debugLog(whichemptyArray);
      this.whichempty = whichemptyArray.toString();
      // toggle feedback template view vars
      this.testProblem = true;
    }

  }


  formSend(_val) {
  this.edSer.debugLog(_val);
  }

    


}
