import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/template/header/header.component'
import { FooterComponent } from './components/template/footer/footer.component'
import { LayoutComponent } from './components/layout/layout.component'
import { HomeComponent } from './components/views/home/home.component'
import { LoginComponent } from './components/views/login/login.component'
import { ProductComponent } from './components/views/product/product.component'
import { ShopComponent } from './components/views/shop/shop.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    LayoutComponent,
    ShopComponent,
    LoginComponent,
    ShopComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}

