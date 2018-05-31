import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { CompteContainerComponent } from "./compte-container.component";
import { CompteListComponent } from "./compte-list/compte-list.component";
import { CompteDetailComponent } from "./compte-detail/compte-detail.component";
import { OperationComponent } from "./operation/operation.component";
import { OperationListComponent } from "./operation-list/operation-list.component";



const compteRoutes: Routes = [
{ path: 'compte', component: CompteContainerComponent, children : [
    { path: 'compteList', component: CompteListComponent},
    { path: ':compteDetail', component: CompteDetailComponent},
    { path: ':operation', component: OperationComponent}, 
    { path: 'operationList', component: OperationListComponent}    
] }
];

  @NgModule({
    imports: [ RouterModule.forChild(compteRoutes) ]
  })

export class CompteRoutingModule{}