import { HttpClient, HttpClientModule } from '@angular/common/http'
import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './components/template/header/header.component'
import { FooterComponent } from './components/template/footer/footer.component'
import { LayoutComponent } from './components/layout/layout.component'
import { HomeComponent } from './components/views/home/home.component'
import { LoginComponent } from './components/views/login/login.component'
import { CategoryComponent } from './components/views/category/category.component';
import { ProdutosComponent } from './components/views/produtos/produtos.component';
import { CarrinhoComprasComponent } from './components/views/carrinho-compras/carrinho-compras.component';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    CategoryComponent,
    ProdutosComponent,
    CarrinhoComprasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

