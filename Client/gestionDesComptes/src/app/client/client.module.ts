import { NgModule } from '@angular/core';
import { ClientListComponent } from './client-container/client-list/client-list.component';
import { ClientContainerComponent } from './client-container/client-container.component';
import { ClientDetailComponent } from './client-container/client-detail/client-detail.component';
import { NewClientComponent } from './client-container/new-client/new-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientService } from './services/client.service';
import { SharedModule } from '../share/shared.module';
import { AuthenticateModule } from '../login/auth.module';

@NgModule({
  imports: [
    ClientRoutingModule,
    SharedModule,
    AuthenticateModule
  ],
  declarations: [
    ClientListComponent,
    ClientContainerComponent,
    ClientDetailComponent,
    NewClientComponent
  ],
  providers:[ClientService],
  exports:[    
    ClientListComponent,
    ClientContainerComponent,
    ClientDetailComponent,
    NewClientComponent
  ]

})
export class ClientModule { }
