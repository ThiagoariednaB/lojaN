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
    this.funcao();
  }

  funcao = () => {
    const get: any = (): ((data: categorias) => any) => {
      this.productService.getCategory().subscribe((data: categorias) => {
        this.categorias = data['response'].categoria
      });
      return get;
    };

    get();
  }
}
