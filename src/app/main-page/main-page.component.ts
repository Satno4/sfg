import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { AppState } from '../interfaces/model';

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"],
})
export class MainPageComponent implements OnInit {
  constructor(private stateService: StateService) {
    this.stateService.changeAppState(AppState.MAIN);
  }

  ngOnInit(): void {}
}
