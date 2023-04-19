import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { HomeComponent } from './components/views/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/views/product/product.component';
import { ShopComponent } from './components/views/shop/shop.component'
import { CategoryComponent } from './components/views/category/category.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  }, {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'category', component: CategoryComponent
      },
      {
        path: 'product/:id_produto', component: ProductComponent
      },
      {
        path: 'shop', component: ShopComponent
      },
      {
        path: 'login', component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

