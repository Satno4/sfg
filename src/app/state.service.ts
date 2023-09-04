import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppState } from './interfaces/model';

@Injectable({
  providedIn: "root",
})
export class StateService {
  appState$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(
    AppState.MAIN
  );

  constructor() {}

  changeAppState(appState: AppState) {
    this.appState$.next(appState);
  }

}
