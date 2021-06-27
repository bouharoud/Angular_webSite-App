import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  @Input() products: Products[] = [];
  @Input() isPaginate: boolean = true;
  prefUrlImage = `${environment.prefUrlImage}`;
  prodSub: Subscription;
  currentPage = 0;
  pages = [0,1,2,3,4,5,6,7];


  constructor(private productService: ProductsService,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.prodSub = this.productService.prodSubject.subscribe(
      (data)=>{
        this.products = this.productService.getProductByPage(0);
        //console.log(this.products);
        //console.log(data);
      }
    )

    this.productService.emitProducts();
  }

 /* ngOnDestroy(){
    this.prodSub.unsubscribe();
  }*/

  addToCart(product: Products):void{
    this.cartService.addProductToCart(product);
  }

  deleteFromCart(product: Products):void{
    this.cartService.deleteFromCart(product);
  }

  changePage(numberPage:number): void{
    const prod = this.productService.getProductByPage(numberPage);
    if(prod){
      this.products = prod;
      this.currentPage = numberPage;
    }
  }

  nextPage():void{
    const newCurrentPage = this.currentPage + 1;
    const prod = this.productService.getProductByPage(newCurrentPage);
    if(prod){
        this.products = prod;
        this.currentPage = newCurrentPage;
    }
  }

  prevPage():void{
     const newCurrentPage = this.currentPage - 1;
    const prod = this.productService.getProductByPage(newCurrentPage);
    if(prod){
        this.products = prod;
        this.currentPage = newCurrentPage;
    }
  }

}
