import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-container/client-list/client-list.component';
import { ClientContainerComponent } from './client-container/client-container.component';
import { ClientDetailComponent } from './client-container/client-detail/client-detail.component';
import { NewClientComponent } from './client-container/new-client/new-client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientService } from './services/client.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  declarations: [
    ClientListComponent,
    ClientContainerComponent,
    ClientDetailComponent,
    NewClientComponent
  ],
  providers:[ClientService],
  exports:[ClientContainerComponent]

})
export class ClientModule { }
