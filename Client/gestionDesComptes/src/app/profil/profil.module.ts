import { NgModule } from '@angular/core';
import { SharedModule } from '../share/shared.module';
import { ProfilComponent } from './profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilService } from './profil.service';


@NgModule({
  imports: [
    SharedModule,
    ProfilRoutingModule
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
