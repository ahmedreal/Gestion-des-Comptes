import { NgModule } from '@angular/core';

import { CompteRoutingModule } from './compte-routing.module';
import { OperationService } from './operation.service';
import { CompteContainerComponent } from './compte-container/compte-container.component';
import { CompteListComponent } from './compte-container/compte-list/compte-list.component';
import { CompteDetailComponent } from './compte-container/compte-detail/compte-detail.component';
import { OperationListComponent } from './compte-container/operation-list/operation-list.component';
import { OperationComponent } from './compte-container/operation/operation.component';
import { SharedModule } from '../share/shared.module';

@NgModule({
  imports: [
    CompteRoutingModule,
    SharedModule
  ],
  declarations: [
    CompteContainerComponent,
    CompteListComponent,
    CompteDetailComponent,
    OperationListComponent,
    OperationComponent
  ],
  providers:[OperationService],
  exports:[
    CompteContainerComponent,
    CompteListComponent,
    CompteDetailComponent,
    OperationListComponent,
    OperationComponent
  ]

})
export class CompteModule { }
