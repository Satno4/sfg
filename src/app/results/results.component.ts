import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../data-handler.service';
import { SocialService } from '../interfaces/model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results$ = this.dataHandlerService.filteredData$;
  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
  }

  selectSS(ss: SocialService){
    console.log(ss)

  }
}
