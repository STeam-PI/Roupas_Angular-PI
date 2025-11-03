export interface Produtos {
  id: number;
  nome: string;
  cor: string[]; 
  tamanho: string | string[]; 
  marca: string;
  valor: number;
  imagem: string; 
}

export interface Marca {
    id?: number;
    nome: string;
}