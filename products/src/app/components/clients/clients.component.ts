import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clients',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  client: Client = {name: '', email: ''};
  editMode = false;
  private subscriptions :Subscription[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
   const sub = this.clientService.getClients().subscribe((res) => this.clients = res);
    this.subscriptions.push(sub);
  }

  onSubmit(form: NgForm){
    if(this.editMode){
      this.clientService.updateClient(this.client).then(()=>{
      this.clear(form);
    });
  } else{
      this.clientService.addClient(this.client).then(() => form.reset());
    }
  }

  edit(client: Client){
    this.client = {...client};
    this.editMode = true;
  }

  delete(client: Client){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(client);
    }
  }

  clear(form: NgForm){
    form.resetForm();
    this.editMode = false;
    this.client = {name: '', email: ''};
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
