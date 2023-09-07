import { Component, OnInit } from "@angular/core";

import { StateService } from "../state.service";
import { AppState, exploreFilter, scheme } from "../interfaces/model";
import { DataHandlerService } from "../data-handler.service";
import { filter, map, tap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.scss"],
})
export class ExploreComponent implements OnInit {
  cities$ = this.dataHandlerService.cities$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length))
  );
  // regions$ = this.dataHandlerService.regions$.pipe(
  //   map(arr => arr.sort((a, b) => a.length - b.length))
  // );
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
  chosenCategory: exploreFilter | null = null;
  searchTerm = "";
  chosenCity: string | null = null;
  chosenRegion: string | null = null;
  chosenSocialCategory: string | null = null;
  constructor(
    private stateService: StateService,
    private dataHandlerService: DataHandlerService,
    private router: Router
  ) {
    this.stateService.changeAppState(AppState.EXPLORE);
  }

  ngOnInit(): void {}

  chooseCategory(category: exploreFilter) {
    this.chosenCategory === category
      ? (this.chosenCategory = null)
      : (this.chosenCategory = category);
  }

  categoryClicked(category: string) {
    this.chosenSocialCategory === category
      ? (this.chosenSocialCategory = null)
      : (this.chosenSocialCategory = category);
    this.chosenCity = null;
    this.chosenRegion = null;
  }
  cityClicked(city: string) {
    this.chosenCity === city
      ? (this.chosenCity = null)
      : (this.chosenCity = city);
    this.chosenSocialCategory = null;
    this.chosenRegion = null;
  }
  regionClicked(region: string) {
    this.chosenRegion === region
      ? (this.chosenRegion = null)
      : (this.chosenRegion = region);
    this.chosenCity = null;
    this.chosenSocialCategory = null;
  }
  searchClicked() {
    if (this.chosenCity) {
      this.dataHandlerService.filterData(scheme.CITY, this.chosenCity);
    } else if (this.chosenSocialCategory) {
      this.dataHandlerService.filterData(
        scheme.CATEGORY,
        this.chosenSocialCategory
      );
    } else if (this.chosenRegion) {
      this.dataHandlerService.filterData(scheme.REGION, this.chosenRegion);
    } else if (this.searchTerm) {
      this.dataHandlerService.filterData(scheme.KEYWORD, this.searchTerm);
    }

    this.router.navigate(["../results"]);
  }
}
