import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AuthGuard } from "./share/gards/auth.guard";
import { AdminGuard } from "./share/gards/admin.guard";


const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path:'client', canActivate: [AuthGuard, AdminGuard], loadChildren:'app/client/client.module#ClientModule'},
    { path:'profil', canActivate: [AuthGuard], loadChildren:'app/profil/profil.module#ProfilModule'},
    { path:'compte', canActivate: [AuthGuard], loadChildren:'app/compte/compte.module#CompteModule'},
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule {}