import { Component, OnInit } from '@angular/core';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Http
} from '@angular/http';
import 'rxjs/add/operator/map';

import {EdserService} from '../edser.service';

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
  }

}
