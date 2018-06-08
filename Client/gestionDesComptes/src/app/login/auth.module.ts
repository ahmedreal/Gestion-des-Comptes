import { NgModule } from '@angular/core';
import { SharedModule } from '../share/shared.module';
import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthentifficationService } from './authentiffication.service';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers:[AuthentifficationService],
  exports:[LoginComponent]

})
export class AuthenticateModule { }
