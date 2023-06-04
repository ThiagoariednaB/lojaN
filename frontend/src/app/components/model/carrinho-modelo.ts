import { produtos } from "./model.component";

export class carrinho1 {
constructor(public produtos: produtos, public quantidade: number = 1){}

value(): number {
  return this.produtos.preco * this.quantidade
}
}

export class carrinho2 {
  public produtos: any
  public textContent: any
  public response: any
  public id_produto: number = 0
  public descricao: string = ''
  public un: string = ''
  public preco: number = 0
  public produto_imagem: string = ''
  public quantidade: number = 0
  public categoria:  string = ''
  public descricaoProduto: string = ''
  public estoque: number = 0
  static id_produto: any
  static categorias: any
}
