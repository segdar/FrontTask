import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    },
  {
    path: "login",
    loadComponent: () => import("./modules/login/login.component").then((m) => m.LoginComponent)
    
  }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
