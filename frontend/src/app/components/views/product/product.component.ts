import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot, Params } from '@angular/router';
import * as _ from 'lodash';
import { ProductService } from '../../service/product.service';
import { produtos } from '../../model/model.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  produtos: produtos[] = []
  id: number = 0
  insc: Subscription = new Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.carregaInnerHTML()
  }

  ngOnDestroy(){
    //this.insc.unsubscribe()
  }

  carregaInnerHTML() {
    this.insc = this.route.params.subscribe((params: any) => {
      this.id = params['id_produto']
    })
    const get = () => {
      this.productService.getProductsid(this.id).subscribe((data: produtos) => {
        this.produtos = data['produtos']
      });
    };
    get()

  }
}
