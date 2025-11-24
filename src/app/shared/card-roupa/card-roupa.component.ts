import { Component, Input } from '@angular/core';
import { Produtos } from '../../core/types/types';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-roupa',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './card-roupa.component.html',
  styleUrl: './card-roupa.component.css'
})
export class CardRoupaComponent {
  @Input() produto!: Produtos;
}
