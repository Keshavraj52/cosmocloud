import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ImageDetaComponent } from './image-deta/image-deta.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetails2Component } from './product-details2/product-details2.component';
import { VaidyaComponent } from './vaidya/vaidya.component';
import { EarComponent } from './ear/ear.component';
import { HairComponent } from './hair/hair.component';
import { SkinComponent } from './skin/skin.component';
import { HApplicationComponent } from './h-application/h-application.component';
import { AdditionalDiscountComponent } from './additional-discount/additional-discount.component';
import { FlaskApiComponent } from './flask-api/flask-api.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { DiseaseComponent } from './disease/disease.component';

const routes: Routes = [
  {
    path: 'store',
    component: HomeComponent
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[authGuard]

  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[authGuard]
  },
  {
    component: SearchComponent,
    path:'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    component:CartPageComponent,
    path:'cart-page'
  },
  {
    component:CheckoutComponent,
    path:'checkout'
  },
  {
    component:MyOrdersComponent,
    path:'myorders'
  },
  {
    component:ImageDetaComponent,
    path:'image-data'
  },
  {
    component:ProfileComponent,
    path:'profile/:userId'
  },
  {
    component:ProductDetails2Component,
    path:'productde/:productId'
  },
{
path:'',
component:VaidyaComponent
},
{
  path:'ear',
  component:EarComponent
},
{
  path:'hair',
  component:HairComponent
},
{
  path:'skin',
  component:SkinComponent
},
{
  path:'h-application',
  component:HApplicationComponent
},
{
path:'additional',
component:AdditionalDiscountComponent

},
{
  path:'flask',
  component:FlaskApiComponent
},
{
  path:'chat',
  component:ChatBotComponent
},
{
  path:'doctor',
  component:DoctorAppointmentComponent
},
{
  path:'disease',
  component:DiseaseComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
