import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProdAddComponent } from './pages/prod-add/prod-add.component';

export const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'login', component: LoginComponent},
  {path:'roupas/cadastro', component: ProdAddComponent},
  {path:'roupas/listagem', component: ProdAddComponent},
];
