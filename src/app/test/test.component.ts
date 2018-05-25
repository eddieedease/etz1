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



  // var for finishing test
  testFinished = false;


  // results of tests
  result1 = 0;
  result2 = 0;
  result3 = 0;
  result4 = 0;
  result5 = 0;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private http_: Http, private edSer: EdserService) {
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
  }

  finishTest() {
    this.testFinished = true;

    // TODO:  check if everything has been filled in

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
      }
    }

    this.result1 = this.result1 / 8;
    this.result2 = this.result2 / 8;
    this.result3 = this.result3 / 7;
    this.result4 = this.result4 / 7;
    this.result5 = this.result5 / 8;

    this.edSer.debugLog('Result 1: ' + this.result1);
    this.edSer.debugLog('Result 2: ' + this.result2);
    this.edSer.debugLog('Result 3: ' + this.result3);
    this.edSer.debugLog('Result 4: ' + this.result4);
    this.edSer.debugLog('Result 5: ' + this.result5);

  }

}
