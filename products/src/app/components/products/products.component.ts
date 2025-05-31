import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Subscription} from 'rxjs';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';


@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  product: Product = {name: '', description: ''};
  editMode = false;
  private subscriptions :Subscription[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const sub = this.productService.getProducts().subscribe((res) => this.products = res);
    this.subscriptions.push(sub);
  }

  onSubmit(form: NgForm){
    if(this.editMode){
      this.productService.updateProduct(this.product).then(()=>{
        this.clear(form);
      });
    } else{
      this.productService.addProduct(this.product).then(() => form.reset());
    }
  }

  edit(product: Product){
    this.product = {...product};
    this.editMode = true;
  }

  delete(product: Product){
    if(confirm('Are you sure?')){
      this.productService.deleteProduct(product);
    }
  }

  clear(form: NgForm){
    form.resetForm();
    this.editMode = false;
    this.product = {name: '', description: ''};
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
