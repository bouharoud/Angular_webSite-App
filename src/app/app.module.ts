import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './shop/products/products.component';
import { SingleProductComponent } from './shop/single-product/single-product.component';
import { CartComponent } from './shop/cart/cart.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalAddToCartComponent } from './shop/modal-add-to-cart/modal-add-to-cart.component';
import { ModalQuickViewComponent } from './shop/modal-quick-view/modal-quick-view.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './shop/slider/slider.component';

const routes: Routes=[
  { path:'home',component:HomeComponent },
  { path:'shop',component:ShopComponent },
  { path:'cart',component:CartComponent },
  { path:'single-product/:id',component:SingleProductComponent },
  { path:'category/:id',component:CategoryComponent },
  { path:'contact',component:ContactComponent },
  { path:'login',component:LoginComponent },
  { path:'register',component:RegisterComponent },
  { path:'notFound',component:NotFoundComponent },
  { path:'',component:ShopComponent },
  { path:'**',redirectTo:'notFound',pathMatch:'full' },

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    NotFoundComponent,
    ModalAddToCartComponent,
    ModalQuickViewComponent,
    CategoryComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
