import { Injectable } from "@angular/core";
import * as d3 from "d3-fetch";
import { BehaviorSubject, from, map, tap } from "rxjs";
import {
  SocialService,
  quizAnswers,
  quizState,
  scheme,
} from "./interfaces/model";

@Injectable({
  providedIn: "root",
})
export class DataHandlerService {
  url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSiWiD1kxXugepZ6iJ-QAI2csieusNCbBTcDZhNeOUdMlXtufCu3nmXU9rQTZNIOLnslFsL1aafRnxj/pub?gid=888593843&single=true&output=csv";
  data!: SocialService[];
  cities$ = new BehaviorSubject<string[]>([]);
  categories$ = new BehaviorSubject<string[]>([]);
  filteredData$ = new BehaviorSubject<SocialService[]>([]);
  statuses$ = new BehaviorSubject<string[]>([]);
  familyRequirements$ = new BehaviorSubject<string[]>([]);
  parentRequirements$ = new BehaviorSubject<string[]>([]);
  healthRequirements$ = new BehaviorSubject<string[]>([]);
  schemeEnum = scheme;

  constructor() {}

  getData() {
    return from(d3.csv(this.url)).pipe(
      map((data: any) =>
        data.map((el: any, i: number) => ({
          serviceName: el["serviceName"],
          serviceDescription: el["serviceDescription"],
          serviceCategory: el["serviceCategory"].includes(",")
            ? el["serviceCategory"].split(",").map((el: string) => el.trim())
            : [el["serviceCategory"]],
          beneficiary: el["beneficiary"].includes(",")
            ? el["beneficiary"].split(",").map((el: string) => el.trim())
            : el["beneficiary"].includes(" და ")
            ? el["beneficiary"].split(" და ").map((el: string) => el.trim())
            : [el["beneficiary"]],
          provider: el["provider"],
          location: el["location"] ? el["location"] : null,
          region: el["region"].includes(",")
            ? el["region"].split(",").map((el: string) => el.trim())
            : el["region"]
            ? [el["region"]]
            : null,
          email: el["email"],
          phone: el["phone"],
          address: el["address"],
          singleUse:
            el["singleUse"] === "TRUE"
              ? true
              : el["singleUse"] === "FALSE"
              ? false
              : null,
          healthRequirement: el["healthRequirement"]
            ? el["healthRequirement"].includes(",")
              ? el["healthRequirement"]
                  .split(",")
                  .map((el: string) => el.trim())
              : [el["healthRequirement"]]
            : null,
          familyRequirement: el["familyRequirement"]
            ? el["familyRequirement"].includes(",")
              ? el["familyRequirement"]
                  .split(",")
                  .map((el: string) => el.trim())
              : [el["familyRequirement"]]
            : null,
          documentation: el["documentation"].includes(";")
            ? el["documentation"].split(";").map((el: string) => el.trim())
            : el["documentation"]
            ? [el["documentation"]]
            : null,
          ageRestriction: el["ageRestriction"]
            ? {
                min: el["ageRestriction"]
                  .split("-")
                  .map((el: string) => el.trim())[0],
                max: el["ageRestriction"]
                  .split("-")
                  .map((el: string) => el.trim())[1],
              }
            : null,
          benefit: el["benefit"],
          yearSpecific:
            el["yearSpecific"] === "TRUE" || el["yearSpecific"] === "FALSE"
              ? el["yearSpecific"]
              : null,
          educationRequirement: el["educationRequirement"].includes(",")
            ? el["educationRequirement"]
                .split(",")
                .map((el: string) => el.trim())
            : el["educationRequirement"]
            ? [el["educationRequirement"]]
            : null,
          diagnoses: el["diagnoses"]
            ? el["diagnoses"].includes(",")
              ? el["diagnoses"].split(",").map((el: string) => el.trim())
              : [el["diagnoses"]]
            : null,
          index: i,
          link: el["link"],
          parentRequirement: el["parentRequirement"].includes(",")
            ? el["parentRequirement"].split(",").map((el: string) => el.trim())
            : el["parentRequirement"]
            ? [el["parentRequirement"]]
            : null,
          individualRequirement: el["individualRequirement"].includes(",")
            ? el["individualRequirement"]
                .split(",")
                .map((el: string) => el.trim())
            : el["individualRequirement"]
            ? [el["individualRequirement"]]
            : null,
        }))
      ),
      tap((data: SocialService[]) => {
        this.data = data;
      })
    );
  }

  emitFiltered() {
    const cities = Array.from(
      new Set(this.data.map(el => el.location).filter(el => el))
    ) as string[];
    this.cities$.next(cities);
    const categories = Array.from(
      new Set(
        this.data
          .map(el => el.serviceCategory)
          .flat()
          .filter(el => el)
      )
    );
    this.categories$.next(categories);
    const statuses = Array.from(
      new Set(
        this.data
          .map(el =>
            el.individualRequirement
              ?.map(el =>
                el.includes(" + ")
                  ? el.split(" + ").map(el => el.trim())
                  : el.trim()
              )
              .flat()
          )
          .flat()
          .filter(el => el)
      )
    ) as string[];
    this.statuses$.next(statuses);
    const familyRequirements = Array.from(
      new Set(
        this.data
          .map(el => el.familyRequirement)
          .flat()
          .filter(el => el)
      )
    ) as string[];
    this.familyRequirements$.next(familyRequirements);
    const parentRequirements = Array.from(
      new Set(
        this.data
          .map(el => el.parentRequirement)
          .flat()
          .filter(el => el)
      )
    ) as string[];
    this.parentRequirements$.next(parentRequirements);
    const healthRequirements = Array.from(
      new Set(
        this.data
          .map(el => el.healthRequirement)
          .flat()
          .filter(el => el)
      )
    ) as string[];
    this.healthRequirements$.next(healthRequirements);
  }

  filterData(scheme: scheme, value: string[]) {
    let filteredData: SocialService[] = [];
    if (scheme === this.schemeEnum.KEYWORD) {
      filteredData = this.data.filter(
        el =>
          el.serviceDescription.includes(value[0]) ||
          el.serviceName.includes(value[0]) ||
          (el.benefit && el.benefit.includes(value[0]))
      );
    } else if (scheme === this.schemeEnum.CATEGORY_CITY) {
      filteredData = this.data.filter(
        el => el.serviceCategory.includes(value[0]) && el.location === value[1]
      );
    }
    this.filteredData$.next(filteredData);
  }

  filterQuizzData(quizAnswers: quizAnswers) {
    console.log(quizAnswers)
    let filteredData: SocialService[] = [];
    filteredData = this.data.filter(el =>
      el.location ? quizAnswers.city.includes(el.location) : true
    );
    filteredData = filteredData.filter(
      ss =>
        (quizAnswers.status &&
          ss.individualRequirement?.some(
            el => quizAnswers.status && quizAnswers.status.includes(el)
          ) === true) ||
        (quizAnswers.family &&
          ss.familyRequirement?.some(
            el => quizAnswers.family && quizAnswers.family.includes(el)
          ) === true) ||
        (quizAnswers.parents &&
          ss.parentRequirement?.some(
            el => quizAnswers.parents && quizAnswers.parents.includes(el)
          ) === true) ||
        (quizAnswers.health &&
          ss.healthRequirement?.some(
            el => quizAnswers.health && quizAnswers.health.includes(el)
          ) === true) ||
        !ss.individualRequirement ||
        !ss.familyRequirement ||
        !ss.parentRequirement ||
        !ss.healthRequirement
    );
    this.filteredData$.next(filteredData);
  }
}
