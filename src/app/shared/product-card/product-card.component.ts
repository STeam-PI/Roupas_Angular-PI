import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Produtos } from '../../core/types/types';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyPipe, FontAwesomeModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() produto!: Produtos;

  constructor(private cartService: CartService) { } 

  adicionarAoCarrinho(produto: Produtos): void {
    this.cartService.adicionarItem(produto); 
    alert(`${produto.nome} adicionado ao carrinho!`); 
  }
}