import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./services/authGuard.service";


const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
  },
 
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    },
  {
    path: "login",
    loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent),
    
  },

  {
    path: "welcome",
    canActivate: [authGuard],
   loadComponent: () => import("./modules/welcome/welcome.component").then((m) => m.WelcomeComponent)
  }
  



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
