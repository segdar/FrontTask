
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


export const authGuard: CanActivateFn = (route, state) => {

  const isLoggedIn = !!localStorage.getItem('ie');
  const router = inject(Router);

  if (isLoggedIn) {
    console.log("insde true", isLoggedIn)
    return true;
  } else {
    console.log("insde false", isLoggedIn)
    router.navigate(['/login']);
    return false;
  }

}
