import { Component, OnInit } from '@angular/core';
import { StateService } from "../state.service";
import { AppState } from "../interfaces/model";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  constructor(private stateService: StateService) {
    this.stateService.changeAppState(AppState.ABOUT);
  }

  ngOnInit(): void {}
}
