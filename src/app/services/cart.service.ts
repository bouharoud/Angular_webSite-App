import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Local } from 'protractor/built/driverProviders';
import { Cart } from '../model/cart';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart[]=[];
  cartData={len:0,cost:0};

  constructor() {
    this.initCart();
  }

  initCart():void{
    if(typeof(localStorage)!=="undefined"){
      const cart  = JSON.parse(localStorage.getItem('cart'));
      const cartData  = JSON.parse(localStorage.getItem('cartData'));
      this.cart = cart ? cart : [];
      this.cartData = cartData ? cartData : [];
    }else{
      this.cart = [];
      this.cartData = {len:0,cost:0};
    }
  }

  updateDateCart(){
    let len=0;
    let cost=0;
    this.cart.forEach(element =>{
      len += element.number;
      cost += element.product.price*element.number;
    });
      this.cartData.len = len;
      this.cartData.cost = cost;

      if(typeof(localStorage)!=="undefined"){
        localStorage.setItem('cart',JSON.stringify(this.cart));
        localStorage.setItem('cartData',JSON.stringify(this.cartData));
      }
  }


  addProductToCart(newProduct:Products):void{

    const checkedProduct = this.cart.find(element => element.product == newProduct);

    if(checkedProduct){
      checkedProduct.number++;
    }else{
      const newProductToAdd = {
        number:1,
        product: newProduct
      };
      this.cart.push(newProductToAdd);
    }
    this.updateDateCart();

  }

  deleteFromCart(productToDelete: Products):void{
    const indexProduct = this.cart.findIndex(element => element.product  == productToDelete);
    console.log(indexProduct);
    if(indexProduct !== -1){
      if(this.cart[indexProduct].number > 1){
        this.cart[indexProduct].number--;
      }else{
        this.cart.splice(indexProduct,1);
      }
    }
    this.updateDateCart();
  }
}
