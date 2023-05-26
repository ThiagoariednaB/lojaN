import { categorias, produtos } from '../../model/model.component';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Routes } from '@angular/router';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  produtosId: produtos[] = []
  id: number = 1
  ids: any
  inscricaoEscutador: Subscription = new Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.carregaDOM()
  }

  ngOnDestroy() {
    this.inscricaoEscutador.unsubscribe()
  }

  carregaDOM() {
    this.inscricaoEscutador = this.route.params.subscribe((produtos: any) => {
      this.id = produtos['id_produto']
    })
      const getId: any = (): ((data: produtos) => any) => {
        this.productService.getProductsid(this.id).subscribe((data: produtos) => {
          this.produtosId = data['produtos']
        });
        return getId
      };
      getId()

  }
}
