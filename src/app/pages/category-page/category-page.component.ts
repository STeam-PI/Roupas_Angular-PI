import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { ProdutosService } from '../../core/services/produtos.service'; 
import { Produtos } from '../../core/types/types';
import { ProductCardComponent } from '../../shared/product-card/product-card.component'; 


@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, ProductCardComponent], 
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  public produtos$!: Observable<Produtos[]>; 
  public categoriaTitulo: string = '';

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService 
  ) {}

  ngOnInit(): void {
    this.produtos$ = this.route.paramMap.pipe(
      switchMap(params => {
        const categoria = params.get('categoria')!; 
        this.categoriaTitulo = categoria;
        return this.produtosService.getProdutosPorCategoria(categoria);
      })
    );
  }
}