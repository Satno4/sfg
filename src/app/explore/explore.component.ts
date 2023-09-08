import { Component } from "@angular/core";

import { exploreFilter, scheme } from "../interfaces/model";
import { DataHandlerService } from "../data-handler.service";
import { filter, map } from "rxjs";
import { Router } from "@angular/router";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"],
})
export class ExploreComponent {
  cities$ = this.dataHandlerService.cities$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length))
  );
  categories$ = this.dataHandlerService.categories$.pipe(
    filter(arr => arr.length > 0),
    map(arr =>
      arr.map((el: any) => ({
        name: el,
        icon:
          el === "განათლება | კულტურა | სპორტი"
            ? "education"
            : el === "ჯანდაცვა"
            ? "health"
            : el === "მატერიალური დახმარება"
            ? "currency"
            : el === "სოციალური კონსულტაცია"
            ? "community"
            : null,
      }))
    )
  );
  categoryEnum = exploreFilter;
  searchControl = new FormControl("", Validators.minLength(4));
  chosenCity: string | null = null;
  chosenRegion: string | null = null;
  chosenSocialCategory: string | null = null;
  constructor(
    private dataHandlerService: DataHandlerService,
    private router: Router
  ) {}

  categoryClicked(category: string) {
    this.chosenSocialCategory === category
      ? (this.chosenSocialCategory = null)
      : (this.chosenSocialCategory = category);
    this.searchControl.setValue("");
  }
  cityClicked(city: string) {
    this.chosenCity === city
      ? (this.chosenCity = null)
      : (this.chosenCity = city);
    this.searchControl.setValue("");
  }
  searchClicked() {
    if (this.chosenSocialCategory && this.chosenCity) {
      this.dataHandlerService.filterData(scheme.CATEGORY_CITY, [
        this.chosenSocialCategory,
        this.chosenCity,
      ]);
    } else if (this.searchControl.valid) {
      this.dataHandlerService.filterData(scheme.KEYWORD, [
        this.searchControl.value as string,
      ]);
    }
    this.router.navigate(["../results"]);
  }
}
