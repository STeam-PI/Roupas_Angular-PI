import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar o pipe 'currency'
import { RouterLink } from '@angular/router';   // Para usar [routerLink]
import { Produtos } from '../../core/types/types'; 


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  
  @Input() produto!: Produtos; 
  
  constructor() {}
}