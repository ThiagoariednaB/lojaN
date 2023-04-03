import { ProductService } from './../../service/product.service';
import { produtos, categorias } from './../../model/model.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categorias:categorias [] = []

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.funcao()
  }

  funcao = () => {
    const get: any = (): ((data: categorias) => any) => {
      this.productService.getCategory().subscribe((data: categorias) => {
        this.categorias = data['response'].categorias
      });
      return get;
    };



    const html: any = {
      get(element: any) {
        return document.querySelector(element);
      }
    };

    const baseBd: any = {
      create(data: categorias) {
        const div = document.createElement('div');
        div.classList.add('data');
        div.innerHTML = data['response'].categorias
      },
      up() {
        html.get('.ul1').innerHTML = '';
        html.get('.ul1').innerHTML = get();
      },
    };
    console.log(this.categorias)
    

  }
}
