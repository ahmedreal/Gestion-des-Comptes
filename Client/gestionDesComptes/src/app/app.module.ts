import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { CompteContainerComponent } from './compte/compte-container/compte-container.component';
import { ClientContainerComponent } from './client/client-container/client-container.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { CompteListComponent } from './compte/compte-container/compte-list/compte-list.component';
import { CompteDetailComponent } from './compte/compte-container/compte-detail/compte-detail.component';
import { OperationListComponent } from './compte/compte-container/operation-list/operation-list.component';
import { OperationComponent } from './compte/compte-container/operation/operation.component';
import { ClientListComponent } from './client/client-container/client-list/client-list.component';
import { ClientDetailComponent } from './client/client-container/client-detail/client-detail.component';
import { EditProfilComponent } from './profil/edit-profil/edit-profil.component';
import { NewClientComponent } from './client/client-container/new-client/new-client.component';
import { OperationService } from './share/service/operation.service';
import { AuthentifficationService } from './share/service/authentiffication.service';
import { AuthInterceptor } from './share/Intercepteurs/auth.interceptor';
import { ProfilService } from './share/service/profil.service';
import { TypeOperationPipe } from './compte/type-operation.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompteContainerComponent,
    ClientContainerComponent,
    LoginComponent,
    ProfilComponent,
    CompteListComponent,
    CompteDetailComponent,
    OperationListComponent,
    OperationComponent,
    ClientListComponent,
    ClientDetailComponent,
    EditProfilComponent,
    NewClientComponent,
    TypeOperationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi : true
    },
    OperationService,
     AuthentifficationService,
     ProfilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
