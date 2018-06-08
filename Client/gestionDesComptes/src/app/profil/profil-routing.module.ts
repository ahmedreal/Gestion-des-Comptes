import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ProfilComponent } from "./profil.component";
import { EditProfilComponent } from "./edit-profil/edit-profil.component";
import { AuthGuard } from "../share/gards/auth.guard";



const profilRoutes: Routes = [
    { path: '', canActivate: [AuthGuard], component: ProfilComponent},
    { path:'edit', canActivate: [AuthGuard], component: EditProfilComponent}
];

  @NgModule({
    imports: [ RouterModule.forChild(profilRoutes) ]
  })

export class ProfilRoutingModule{}