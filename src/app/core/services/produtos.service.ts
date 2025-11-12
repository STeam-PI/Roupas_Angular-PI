import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../types/types';
import { Marca } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  // Altera para o endpoint base e usa endpoints específicos para produtos e marcas
  private readonly API = 'http://localhost:3000'; 
  private readonly PRODUTOS_API = `${this.API}/produtos`;
  private readonly MARCAS_API = `${this.API}/marcas`; 
  
  constructor (private http: HttpClient) { }

  listar(): Observable<Produtos[]>{ 
    return this.http.get<Produtos[]>(this.PRODUTOS_API);
  }

  listarMarcas(): Observable<Marca[]>{ 
    return this.http.get<Marca[]>(this.MARCAS_API);
  }

  inserirMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.MARCAS_API, marca);
  }

  buscarPorId(id: String | number): Observable<Produtos | undefined> {
    return this.http.get<Produtos>(this.PRODUTOS_API+`/${id}`);
  }

  inserir(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.PRODUTOS_API, produto);
  }

  atualizar(produto: Produtos): Observable<Produtos> {
    const url = `${this.PRODUTOS_API}/${produto.id}`;
    return this.http.put<Produtos>(url, produto);
  }

  excluir(id: string | number): Observable<void> {
    return this.http.delete<void>(this.PRODUTOS_API + `/${id}`);
  }

  getLancamentos(): Observable<Produtos[]> {
    const url = `${this.PRODUTOS_API}?_sort=id&_order=desc`;
    return this.http.get<Produtos[]>(url);
  }

  getProdutosPorCategoria(categoria: string): Observable<Produtos[]> {
    const url = `${this.PRODUTOS_API}?categoria=${categoria}`;
    return this.http.get<Produtos[]>(url);
  }
}
