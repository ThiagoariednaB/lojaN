export class produtos {
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
  static id_produto: number
  static categorias: any
  public qItensIguais: number = 0
}

export class categorias {
  public response: any
  public id_categoria: number = 0
  public categoria:  string = ''
  textContent: any
}


export class ceps {
  public cep: any
  public uf: any
  public cidade: any
  public bairro: any
  public logradouro: any
  public localidade: any
  public response: any
}


