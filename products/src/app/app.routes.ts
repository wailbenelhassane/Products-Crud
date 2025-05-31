import { Routes } from '@angular/router';
import {ClientsComponent} from './components/clients/clients.component';
import {ProductsComponent} from './components/products/products.component';
import {OrdersComponent} from './components/orders/orders.component';


export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'orders', component: OrdersComponent},
];
