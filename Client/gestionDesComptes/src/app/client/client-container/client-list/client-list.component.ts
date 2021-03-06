import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../../share/models/client.model';
import { Router } from '@angular/router';
import { Compte } from '../../../share/models/compte.model';import { Page } from 'ngx-pagination/dist/pagination-controls.directive';
import { Subscription } from 'rxjs';
;


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  public clients:Client[];
  public client:Client;
  public searchClient:string= '';
  public page:Page;
  public sub:Subscription;
 
  constructor(private clientService:ClientService, private router:Router) { }

  ngOnInit() {
    this.clientService.getListClients();
    this.sub = this.clientService.clients.subscribe(clients => {
      this.clients = clients
    });
  }

  getClientDetails(client:Client){
    this.clientService.client.next(client);
  }

  createAdmin(){
    this.router.navigate(['client/new'], { queryParams: { 'type': 'Administrateur' } });
  }

  createClient(){
    this.router.navigate(['client/new'], { queryParams: { 'type': 'Client' } });
  }

  ngOnDestroy(){
    if(this.sub)
     this.sub.unsubscribe;
  }


}
