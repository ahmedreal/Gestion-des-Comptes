import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FilterClientPipe } from "./pipes/filter.pipe";
import { FilterCodeCourantPipe } from "./pipes/filter-codeCourant.pipe";
import { FilterSearchPipe } from "./pipes/filter-search.pipe";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedService } from "./service/shared.service";
import { AuthGuard } from "./gards/auth.guard";
import { AdminGuard } from "./gards/admin.guard";
import { AuthInterceptor } from "./Intercepteurs/auth.interceptor";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TypeOperationPipe } from "./pipes/type-operation.pipe";


@NgModule({
    declarations:[
        HeaderComponent,
        FilterClientPipe,
        FilterCodeCourantPipe,
        FilterSearchPipe,
        TypeOperationPipe
      ],
      imports:[
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgxPaginationModule
      ],
      providers:[
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi : true
        },
        SharedService,
        AuthGuard,
        AdminGuard
      ],
      exports:[
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        HeaderComponent,
        FilterClientPipe,
        FilterCodeCourantPipe,
        FilterSearchPipe,
        TypeOperationPipe
      ]
})
export class SharedModule {}