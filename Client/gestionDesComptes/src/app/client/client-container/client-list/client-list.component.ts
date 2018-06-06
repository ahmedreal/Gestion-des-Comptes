import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../../share/models/client.model';
import { Router } from '@angular/router';
import { Compte } from '../../../share/models/compte.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  public clients:Client[];
  public client:Client;
 
  constructor(private clientService:ClientService, private router:Router) { }

  ngOnInit() {
    this.clientService.getListClients();
    this.clientService.clients.subscribe(clients => this.clients = clients);
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


}
