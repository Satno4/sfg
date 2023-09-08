import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../data-handler.service';
import { SocialService, scheme } from '../interfaces/model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results$ = this.dataHandlerService.filteredData$;
  socialService: SocialService | null = null;
  constructor(private dataHandlerService: DataHandlerService) {
    // this.dataHandlerService.filterData(scheme.CITY, 'სიღნაღი');

   }

  ngOnInit(): void {
  }

  selectSS(ss: SocialService){
   this.socialService = ss;
  }

  unselectSS(){
    this.socialService = null;
  }
}
