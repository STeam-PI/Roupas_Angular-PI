import { Component, OnInit } from '@angular/core';
import { CardRoupaComponent } from "../../shared/card-roupa/card-roupa.component";
import { RouterLink } from '@angular/router';
import { ProdutosService } from '../../core/services/produtos.service';
import { Observable, of, switchMap } from 'rxjs';
import { Produtos } from '../../core/types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, CardRoupaComponent, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  public produtosLancamento$!: Observable<Produtos[]>;
  public produtosDestaque$!: Observable<Produtos[]>;
  constructor(
    private produtosService: ProdutosService
  ) { }

  ngOnInit(): void {
    const produtos = this.produtosService.getLancamentos();
    this.produtosLancamento$ = produtos.pipe(
      switchMap((produtos: Produtos[]) => {
        const lancamentos = produtos.slice(0, 5);
        return of(lancamentos);
      })
    );
    this.produtosDestaque$ = produtos.pipe(
      switchMap((produtos: Produtos[]) => {
        const lancamentos = produtos.slice(-5);
        return of(lancamentos);
      })
    );
  }
}
