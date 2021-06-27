import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'src/app/model/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-quick-view',
  templateUrl: './modal-quick-view.component.html',
  styleUrls: ['./modal-quick-view.component.css']
})
export class ModalQuickViewComponent implements OnInit {

  @Input() products:Products[] = [];
  prefUrlImage = `${environment.prefUrlImage}`;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }
  addCart(product:Products){
    this.cartService.addProductToCart(product);
  }

}
