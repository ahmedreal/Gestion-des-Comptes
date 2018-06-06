import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ClientContainerComponent } from "./client-container/client-container.component";
import { NewClientComponent } from "./client-container/new-client/new-client.component";
import { ClientDetailComponent } from "./client-container/client-detail/client-detail.component";
import { ClientListComponent } from "./client-container/client-list/client-list.component";



const clientRoutes: Routes = [
  { path: '', component: ClientListComponent},
  { path: 'new', component: NewClientComponent},
];

  @NgModule({
    imports: [ RouterModule.forChild(clientRoutes) ],
  })

export class ClientRoutingModule{}