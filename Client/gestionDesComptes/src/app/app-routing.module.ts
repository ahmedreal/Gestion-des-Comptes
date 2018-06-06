import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { CompteContainerComponent } from "./compte/compte-container/compte-container.component";
import { ProfilComponent } from "./profil/profil.component";
import { LoginComponent } from "./login/login.component";
import { EditProfilComponent } from "./profil/edit-profil/edit-profil.component";
import { CompteListComponent } from "./compte/compte-container/compte-list/compte-list.component";
import { AuthGuard } from "./share/gards/auth.guard";
import { AdminGuard } from "./share/gards/admin.guard";


const appRoutes: Routes = [
    { path:'client', canActivate: [AuthGuard, AdminGuard], loadChildren:'app/client/client.module#ClientModule'},
    { path: 'compte', canActivate: [AuthGuard], component: CompteListComponent, children:[
      {path: ':codeCompte', canActivate: [AuthGuard], component: CompteContainerComponent}
    ]},
    { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent},
    { path:'profil/edit', canActivate: [AuthGuard], component: EditProfilComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule {}