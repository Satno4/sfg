import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { DataHandlerService } from "./data-handler.service";

@Injectable({
  providedIn: "root",
})
export class GuardGuard implements CanActivate {
  constructor(private dataHandlerService: DataHandlerService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.dataHandlerService.getData().pipe(
      map(data => !!data),
      tap(() => {
        this.dataHandlerService.emitFiltered();
      })
    );
  }
}
