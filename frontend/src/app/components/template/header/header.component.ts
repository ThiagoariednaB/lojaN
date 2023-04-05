import { ProductService } from './../../service/product.service';
import { produtos, categorias } from './../../model/model.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categorias:produtos [] = []

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.funcao()
  }

  funcao = () => {
    const get: any = (): ((data: produtos) => any) => {
      this.productService.getProducts().subscribe((data: produtos) => {
        this.categorias = data['response'].produtos
      });
      return get;
    };

    console.log(this.categorias)


  }
}
