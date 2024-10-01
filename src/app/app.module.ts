import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FooterComponent } from './footer/footer.component';
import { ImageDetaComponent } from './image-deta/image-deta.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetails2Component } from './product-details2/product-details2.component';
import { SkinComponent } from './skin/skin.component';
import { VaidyaComponent } from './vaidya/vaidya.component';
import { WebcamModule } from 'ngx-webcam';
import { HairComponent } from './hair/hair.component';
import { EarComponent } from './ear/ear.component';
import { HApplicationComponent } from './h-application/h-application.component';
import { AdditionalDiscountComponent } from './additional-discount/additional-discount.component';
import { XRayComponent } from './x-ray/x-ray.component';
import { FlaskApiComponent } from './flask-api/flask-api.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { DocAppointmentComponent } from './doc-appointment/doc-appointment.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DiseaseComponent } from './disease/disease.component';
import { BbListComponent } from './bb-list/bb-list.component';

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrdersComponent,
    FooterComponent,
    ImageDetaComponent,
    ProfileComponent,
    ProductDetails2Component,
    SkinComponent,
    HairComponent,
    EarComponent,
    VaidyaComponent,
    HApplicationComponent,
    AdditionalDiscountComponent,
    XRayComponent,
    FlaskApiComponent,
    ChatBotComponent,
    DoctorAppointmentComponent,
    DocAppointmentComponent,
    DiseaseComponent,
    BbListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    WebcamModule ,
    TranslateModule.forRoot(
      {
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      }
    }
    )
  
    
  ],
  providers: [HttpClient],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
