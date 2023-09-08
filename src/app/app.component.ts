import { Component } from "@angular/core";
import { DataHandlerService } from "./data-handler.service";
import { AppState } from "./interfaces/model";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Observable, distinctUntilChanged, filter, map, tap } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Set For Youth";
  appState = ''
  appStateEnum = AppState;
  constructor(
    private sanitizer: DomSanitizer,
    private registry: MatIconRegistry,
    private router: Router
  ) {
    const url = this.sanitizer.bypassSecurityTrustResourceUrl(
      "assets/svgs/icons.svg"
    );
    this.registry.addSvgIconSetInNamespace("icons", url);
    this.router.events.pipe(
      filter((value: any) => value instanceof NavigationEnd),
      map((value: NavigationStart) =>
        value.url === "/about"
          ? AppState.ABOUT
          : value.url === "/explore"
          ? AppState.EXPLORE
          : value.url === "/quiz"
          ? AppState.QUIZ
          : AppState.MAIN
      ),
      distinctUntilChanged(),
      tap((value: AppState) => (this.appState = value)),
    ).subscribe();
  }
}
