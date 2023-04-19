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
  produtosid: produtos[] = []
  id: number = 0
  insc: Subscription = new Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.carregaInnerHTML()

  }

  ngOnDestroy() {
    this.insc.unsubscribe()
    this.carregaInnerHTML()
  }

  carregaInnerHTML() {

    this.insc = this.route.params.subscribe((params: any) => {
      this.id = params['id_produto']
    })

    const getId: any = () => {
      this.productService.getProductsid(this.id).subscribe((data: produtos) => {
       this.produtosid = data['produtos']
      });
      return getId
    };
    getId()
    //window.location.replace(getId(produtos) || 'http://localhost:4200/product/6')
    console.log(this.id)
  }


}
