import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from "@angular/router";

import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = async( route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
  let authService: AuthService;
  authService = inject(AuthService);
  let router: Router;
  router = inject(Router);
  if (await authService.isUserLogged()) {
      return true;
  }
  else {
      router.navigate(['/login']);
      return false;
  }
}