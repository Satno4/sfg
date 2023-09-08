import { Component } from "@angular/core";
import { DataHandlerService } from "../data-handler.service";
import { FormControl, Validators } from "@angular/forms";
import { quizState } from "../interfaces/model";
import { filter, map } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.scss"],
})
export class QuizComponent {
  constructor(
    private dataHandlerService: DataHandlerService,
    private router: Router
  ) {}
  quizStateEnum = quizState;
  quizState: quizState | null = quizState.CITY;
  nextButtonEnabled = false;
  backButtonEnabled = false;
  resultsButtonEnabled = false;

  cities$ = this.dataHandlerService.cities$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length))
  );
  chosenCities: string[] = [];

  statuses$ = this.dataHandlerService.statuses$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length)),
    map(arr => [...arr, "ჩამოთვლილთაგან არც ერთი"])
  );
  chosenStatuses: string[] = [];

  familyRequirements$ = this.dataHandlerService.familyRequirements$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length)),
    map(arr => [...arr, "ჩამოთვლილთაგან არც ერთი"])
  );
  chosenFamilyRequirements: string[] = [];

  parentRequirements$ = this.dataHandlerService.parentRequirements$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length)),
    map(arr => [...arr, "ჩამოთვლილთაგან არც ერთი"])
  );
  chosenParentRequirements: string[] = [];

  healthRequirements$ = this.dataHandlerService.healthRequirements$.pipe(
    filter(arr => arr.length > 0),
    map(arr => arr.sort((a, b) => a.length - b.length)),
    map(arr => [...arr, "ჩამოთვლილთაგან არც ერთი"])
  );
  chosenHealthRequirements: string[] = [];

  cityClicked(city: string) {
    this.chosenCities.includes(city)
      ? (this.chosenCities = this.chosenCities.filter(el => el !== city))
      : this.chosenCities.push(city);
    if (this.quizState === quizState.CITY) {
      this.nextButtonEnabled = this.chosenCities.length > 0;
    }
  }
  statusClicked(status: string) {
    this.chosenStatuses.includes(status)
      ? (this.chosenStatuses = this.chosenStatuses.filter(el => el !== status))
      : status === "ჩამოთვლილთაგან არც ერთი"
      ? (this.chosenStatuses = ["ჩამოთვლილთაგან არც ერთი"])
      : (this.chosenStatuses = this.chosenStatuses.filter(el=>el !== "ჩამოთვლილთაგან არც ერთი").concat(status));
    if (this.quizState === quizState.STATUS)
      this.nextButtonEnabled = this.chosenStatuses.length > 0;
  }
  familyRequirementClicked(requirement: string) {
    this.chosenFamilyRequirements.includes(requirement)
      ? (this.chosenFamilyRequirements = this.chosenFamilyRequirements.filter(
          el => el !== requirement
        ))
      : requirement === "ჩამოთვლილთაგან არც ერთი"
      ? (this.chosenFamilyRequirements = ["ჩამოთვლილთაგან არც ერთი"])
      : (this.chosenFamilyRequirements = this.chosenFamilyRequirements
          .filter(el => el !== "ჩამოთვლილთაგან არც ერთი")
          .concat(requirement));
    if (this.quizState === quizState.FAMILY)
      this.nextButtonEnabled = this.chosenFamilyRequirements.length > 0;
  }
  parentRequirementClicked(requirement: string) {
    this.chosenParentRequirements.includes(requirement)
      ? (this.chosenParentRequirements = this.chosenParentRequirements.filter(
          el => el !== requirement
        ))
      : requirement === "ჩამოთვლილთაგან არც ერთი"
      ? (this.chosenParentRequirements = ["ჩამოთვლილთაგან არც ერთი"])
      : (this.chosenParentRequirements = this.chosenParentRequirements
          .filter(el => el !== "ჩამოთვლილთაგან არც ერთი")
          .concat(requirement));
    if (this.quizState === quizState.PARENTS)
    this.nextButtonEnabled = this.chosenParentRequirements.length > 0;
  }
  healthRequirementClicked(requirement: string) {
    this.chosenHealthRequirements.includes(requirement)
      ? (this.chosenHealthRequirements = this.chosenHealthRequirements.filter(
          el => el !== requirement
        ))
      : requirement === "ჩამოთვლილთაგან არც ერთი"
      ? (this.chosenHealthRequirements = ["ჩამოთვლილთაგან არც ერთი"])
      : (this.chosenHealthRequirements = this.chosenHealthRequirements
          .filter(el => el !== "ჩამოთვლილთაგან არც ერთი")
          .concat(requirement));
    if (this.quizState === quizState.HEALTH) this.nextButtonEnabled = false;
    this.resultsButtonEnabled = this.chosenHealthRequirements.length > 0;
  }
  next() {
    if (this.quizState === quizState.CITY) {
      this.quizState = quizState.STATUS;
      this.nextButtonEnabled = this.chosenStatuses.length > 0;
      this.backButtonEnabled = true;
    } else if (this.quizState === quizState.STATUS) {
      this.quizState = quizState.FAMILY;
      this.nextButtonEnabled = this.chosenFamilyRequirements.length > 0;
      this.backButtonEnabled = true;
    } else if (this.quizState === quizState.FAMILY) {
      this.quizState = quizState.PARENTS;
      this.nextButtonEnabled = this.chosenParentRequirements.length > 0;;
      this.backButtonEnabled = true;
    } else if (this.quizState === quizState.PARENTS) {
      this.quizState = quizState.HEALTH;
      this.nextButtonEnabled = false;
      this.backButtonEnabled = true;
      this.resultsButtonEnabled = this.chosenHealthRequirements.length > 0;
    }
  }
  back() {
    if (this.quizState === quizState.STATUS) {
      this.quizState = quizState.CITY;
      this.nextButtonEnabled = true;
      this.backButtonEnabled = false;
    } else if (this.quizState === quizState.FAMILY) {
      this.quizState = quizState.STATUS;
      this.nextButtonEnabled = true;
      this.backButtonEnabled = true;
    } else if (this.quizState === quizState.PARENTS) {
      this.quizState = quizState.FAMILY;
      this.nextButtonEnabled = true;
      this.backButtonEnabled = true;
    } else if (this.quizState === quizState.HEALTH) {
      this.quizState = quizState.PARENTS;
      this.nextButtonEnabled = true;
      this.backButtonEnabled = true;
      this.resultsButtonEnabled = false;
    }
  }
  resultsClicked() {
    this.dataHandlerService.filterQuizzData({
      city: this.chosenCities,
      status: this.chosenStatuses.includes("ჩამოთვლილთაგან არც ერთი") || !this.chosenStatuses.length
        ? undefined
        : this.chosenStatuses,
      family: this.chosenFamilyRequirements.includes("ჩამოთვლილთაგან არც ერთი") || !this.chosenFamilyRequirements.length
        ? undefined
        : this.chosenFamilyRequirements,
      parents: this.chosenParentRequirements.includes("ჩამოთვლილთაგან არც ერთი") || !this.chosenParentRequirements.length
        ? undefined
        : this.chosenParentRequirements,
      health: this.chosenHealthRequirements.includes("ჩამოთვლილთაგან არც ერთი") || !this.chosenHealthRequirements.length
        ? undefined
        : this.chosenHealthRequirements,
    });
    this.router.navigate(["../results"]);
  }
}
