import { Component, OnInit } from '@angular/core';
import { produtos } from '../../model/model.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  produtosCarrinho: produtos[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }
}