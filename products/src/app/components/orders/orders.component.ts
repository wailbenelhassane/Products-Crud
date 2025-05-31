import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Subscription} from 'rxjs';
import {Order} from '../../models/order.model';
import {Product} from '../../models/product.model';
import {OrderService} from '../../services/order.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-orders',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = [];
  order: Order = { clientId: '', productId: '', quantity: 0};
  private subscriptions: Subscription[] = [];
  editMode=false;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private productService: ProductService,

  ){}

  ngOnInit() {
    this.subscriptions.push(
      this.orderService.getOrders().subscribe(res => this.orders = res),
      this.clientService.getClients().subscribe(res => this.clients = res),
      this.productService.getProducts().subscribe(res => this.products = res)
    );
  }

  onSubmit(form: NgForm) {
    if(this.editMode){
      this.orderService.updateOrder(this.order).then(() => this.clear(form));
    }else{
      this.orderService.addOrder(form.value).then(() => form.resetForm());
    }
  }

  edit(order: Order) {
    this.order = {...order};
    this.editMode = true;
  }

  delete(order: Order) {
    if(confirm("Are you sure?")){
      this.orderService.deleteOrder(order);
    }
  }

  clear(form: NgForm) {
    form.resetForm();
    this.editMode = false;
    this.order = {clientId: '', productId: '', quantity: 0};
  }

  getClientName(id:string): string {
    return this.clients.find(c => c.id === id)?.name || '';
  }

  getProductName(id:string): string {
    return this.products.find(d => d.id === id)?.name|| '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
