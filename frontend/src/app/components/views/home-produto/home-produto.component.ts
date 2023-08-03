import { Component, LOCALE_ID } from '@angular/core';
import { produtos } from '../../model/model.component';
import { ProductService } from '../../service/product.service';
import { CarrinhoService } from '../../service/carrinho.service';
import { ActivatedRoute, Router, RouterLinkActive, RouterStateSnapshot, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-home-produto',
  templateUrl: './home-produto.component.html',
  styleUrls: ['./home-produto.component.css']
})
export class HomeProdutoComponent {

  produtos: produtos[] = []

  constructor(private productService: ProductService, private route: ActivatedRoute, private CarrinhoService: CarrinhoService, private router: Router) { }

  ngOnInit() {
    this.funcao();
  }

  funcao = () => {
    const state: any = {
      id: 10
    };

    this.route.params.subscribe(params => { state.id = params['id_produto'] })

    const get: any = (): ((data: produtos) => any) => {
      this.productService.getProductsid(state.id).subscribe((data: produtos) => {
        this.produtos = data['produtos'];
      });
      return get;
    };

    get();
  }
}
