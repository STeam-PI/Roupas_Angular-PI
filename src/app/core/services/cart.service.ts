import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produtos } from '../types/types'; 

interface CartItem extends Produtos {
  quantidade: number;
}

@Injectable({
  providedIn: 'root' 
})
export class CartService {
  private _cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public readonly cartItems$: Observable<CartItem[]> = this._cartItems.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this._cartItems.next(JSON.parse(savedCart));
    }
  }

  adicionarItem(produto: Produtos): void {
    const currentItems = this._cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === produto.id);

    if (existingItem) {
      existingItem.quantidade++;
    } else {
      currentItems.push({ ...produto, quantidade: 1 });
    }
    this._cartItems.next(currentItems);
    this.saveCart();
  }

  removerItem(produtoId: number): void {
    const currentItems = this._cartItems.getValue().filter(item => item.id !== produtoId);
    this._cartItems.next(currentItems);
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this._cartItems.getValue()));
  }
}