import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { HomeComponent } from './components/views/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './components/views/category/category.component';
import { ProdutosComponent } from './components/views/produtos/produtos.component';

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
        path: 'produtos/:id_produto', component: ProdutosComponent
      },
      {
        path: 'categoria', component: CategoryComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: '**', component: HomeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

