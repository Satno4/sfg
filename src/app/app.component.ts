import { Component } from "@angular/core";
import { DataHandlerService } from "./data-handler.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "sfy";
  constructor(private dhs: DataHandlerService) {}
}
