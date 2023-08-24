import { Component } from '@angular/core';
import * as d3 from 'd3-fetch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sfy';
  constructor() {
    d3.csv(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vSiWiD1kxXugepZ6iJ-QAI2csieusNCbBTcDZhNeOUdMlXtufCu3nmXU9rQTZNIOLnslFsL1aafRnxj/pub?gid=888593843&single=true&output=csv'
    ).then(console.log);
  }
}
