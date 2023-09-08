import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./main-page/main-page.component";
import { ExploreComponent } from "./explore/explore.component";
import { AboutComponent } from "./about/about.component";
import { ResultsComponent } from "./results/results.component";
import { QuizComponent } from "./quiz/quiz.component";
import { GuardGuard } from "./guard.guard";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [GuardGuard],
    component: AppComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        component: MainPageComponent,
      },
      {
        path: "explore",
        component: ExploreComponent,
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "results",
        component: ResultsComponent,
      },
      {
        path: "quiz",
        component: QuizComponent,
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
