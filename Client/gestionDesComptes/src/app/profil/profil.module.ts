import { NgModule } from '@angular/core';
import { ProfilComponent } from './profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilService } from './profil.service';
import { SharedModule } from '../share/shared.module';


@NgModule({
  imports: [
    ProfilRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfilComponent,
    EditProfilComponent
  ],
  providers:[ProfilService],
  exports:[  
    ProfilComponent,
    EditProfilComponent
]
})
export class ProfilModule { }
