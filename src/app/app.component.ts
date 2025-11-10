import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component'; 
import { FooterComponent } from './shared/footer/footer.component'; 
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

// --- MUDANÇA 1 ---
// Em vez de importar o pack inteiro (fas), 
// importamos apenas o ícone de que precisamos.
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'roupas-angular-pi';

  constructor(library: FaIconLibrary) {
    // --- MUDANÇA 2 ---
    // Adicionamos apenas o ícone específico à biblioteca.
    // Isto é mais eficiente e resolve problemas de registo.
    library.addIcons(faShoppingCart);
  }
}