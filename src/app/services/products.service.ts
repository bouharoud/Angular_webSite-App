import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../model/products';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  product: Products[] = [];
  prodSubject = new Subject<Products[]>();
  numberOfProductByPage = 6;

  constructor(private http:HttpClient) {
    this.getProductsFromServer();
  }

  emitProducts(): void{
    this.prodSubject.next(this.product);
  }

  getProductsFromServer(): void{
    const url = `${environment.API+'products?'+environment.API_KEY}`;

    this.http.get(url).subscribe(
      (dataProducts: Result)=>{
        if(dataProducts.status == 200){
          this.product = dataProducts.result;
          this.emitProducts();
        }else{
          console.log("Error : "+dataProducts.message);

        }
      }
    )
  }

  getProductById(id: number): Products{
    const product = this.product.find(element=>  element.idProduct == id);
    if(product){
      return product;
    }
    return null;

  }

  getProductByPage(numberPage:number): Products[]{
    const lenProduct = this.product.length;
    const numberOfPage = lenProduct/this.numberOfProductByPage;

    if(numberPage > 0 || numberPage < numberOfPage){
         const prodResult = this.product.slice(numberPage*this.numberOfProductByPage, (numberPage+1)*this.numberOfProductByPage);
         return prodResult;
    }
     return null;

  }

}
