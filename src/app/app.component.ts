import { Component } from "@angular/core";
import { DataHandlerService } from "./data-handler.service";
import { StateService } from "./state.service";
import { AppState } from "./interfaces/model";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Set For You";
  appState$ = this.stateService.appState$;
  appStateEnum = AppState;
  constructor(
    private dataHandlerService: DataHandlerService,
    private stateService: StateService,

    private sanitizer: DomSanitizer,
    private registry: MatIconRegistry
  ) {
    const url =
      this.sanitizer.bypassSecurityTrustResourceUrl("assets/svgs/icons.svg");
    this.registry.addSvgIconSetInNamespace("icons", url);
  }
}
