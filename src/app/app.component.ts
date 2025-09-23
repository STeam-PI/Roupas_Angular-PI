import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DadosPessoaisComponent } from './pages/dados-pessoais/dados-pessoais.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdCadastroComponent } from './pages/prod-cadastro/prod-cadastro.component';
import { ProdAddComponent } from './pages/prod-add/prod-add.component';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, DadosPessoaisComponent, RouterOutlet, LandingPageComponent, HeaderComponent, 
    NavComponent, FooterComponent, ProdCadastroComponent, ProdAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Roupas_angular-PI';
}
