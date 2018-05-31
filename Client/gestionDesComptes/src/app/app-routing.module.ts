import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ClientContainerComponent } from "./client/client-container/client-container.component";
import { CompteContainerComponent } from "./compte/compte-container/compte-container.component";
import { ProfilComponent } from "./profil/profil.component";
import { LoginComponent } from "./login/login.component";
import { EditProfilComponent } from "./profil/edit-profil/edit-profil.component";
import { NewClientComponent } from "./client/client-container/new-client/new-client.component";


const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'client', component: ClientContainerComponent},
    { path: 'client/new', component: NewClientComponent},
    { path: 'compte', component: CompteContainerComponent},
    { path: 'profil', component: ProfilComponent},
    { path:'profil/edit', component: EditProfilComponent},
    { path: 'login', component: LoginComponent}
  ];

  @NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule {}