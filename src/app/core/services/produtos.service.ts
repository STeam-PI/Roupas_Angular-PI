import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../types/types'; 

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly API = 'http://localhost:3000/produtos'; 
  
  constructor (private http: HttpClient) { }

  listar(): Observable<Produtos[]>{ 
    return this.http.get<Produtos[]>(this.API);
  }

  buscarPorId(id: string | number): Observable<Produtos | undefined> {
    return this.http.get<Produtos>(this.API+`/${id}`);
  }

  inserir(produto: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(this.API, produto);
  }

  atualizar(produto: Produtos): Observable<Produtos> {
    const url = `${this.API}/${produto.id}`;
    return this.http.put<Produtos>(url, produto);
  }

  excluir(id: string | number): Observable<void> {
    return this.http.delete<void>(this.API+`/${id}`);
  }

  // --- NOVO MÉTODO ADICIONADO ---
  
  /**
   * Busca produtos filtrando por categoria na API.
   * Assume que a API suporta query params (ex: /produtos?categoria=jeans)
   * @param categoria A categoria para filtrar (ex: 'camisetas', 'jeans')
   */
  getProdutosPorCategoria(categoria: string): Observable<Produtos[]> {
    const url = `${this.API}?categoria=${categoria}`;
    return this.http.get<Produtos[]>(url);
  }
}