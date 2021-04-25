import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginclientComponent } from './loginclient/loginclient.component';
import { LoginOwnerComponent } from './loginowner/loginowner.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'product/:id',component:ProductDetailsComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'product-details',component:ProductDetailsComponent},
  {path:'myaccount',component:AccountComponent},
  {path:'cart',component:CartComponent},
  {path:'owlogin',component:LoginOwnerComponent},
  {path:'clogin',component:LoginclientComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'thankyou',component:ThankyouComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
