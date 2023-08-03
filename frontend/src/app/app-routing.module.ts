import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/views/login/login.component';
import { HomeComponent } from './components/views/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoriaComponent } from './components/views/categoria/categoria.component';
import { HomeProdutoComponent } from './components/views/home-produto/home-produto.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'home-produto/:id_produto', component: HomeProdutoComponent
      },
      {
        path: 'categoria/:categoria', component: CategoriaComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: '**', component: HomeComponent
      }
    ]
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
