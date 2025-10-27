import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdAddComponent } from './pages/prod-add/prod-add.component';
import { ProdCadastroComponent } from './pages/prod-cadastro/prod-cadastro.component';
import { DadosPessoaisComponent } from './pages/dados-pessoais/dados-pessoais.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'roupas/cadastro/:id', component: ProdAddComponent }, // Rota para edição
  { path: 'roupas/cadastro', component: ProdAddComponent },      // Rota para cadastro (sem ID)
  { path: 'roupas/listagem', component: ProdCadastroComponent },
  { path: 'usuarios/cadastro', component: DadosPessoaisComponent},
];