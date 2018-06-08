import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AuthGuard } from "../share/gards/auth.guard";
import { CompteListComponent } from "./compte-container/compte-list/compte-list.component";
import { CompteContainerComponent } from "./compte-container/compte-container.component";


const compteRoutes: Routes = [
    { path: '', canActivate: [AuthGuard], component: CompteListComponent, children:[
        {path: ':codeCompte', component: CompteContainerComponent}
      ]}
];

  @NgModule({
    imports: [ RouterModule.forChild(compteRoutes) ],
  })

export class CompteRoutingModule{}