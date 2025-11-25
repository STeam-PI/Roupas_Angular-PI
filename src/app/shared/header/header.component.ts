import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NavComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/login') {
          for (let element of Array.from(document.getElementsByClassName('header__dinamico'))) {
            element.classList.add('hidden');
          }
          document.getElementById('headerNav')?.classList.remove('menu-open');
        }
        else {
          for (let element of Array.from(document.getElementsByClassName('header__dinamico'))) {
            element.classList.remove('hidden');
          }
        }
      }
    });
  }

  get usuario(): string | null {
    return localStorage.getItem('usuario');
  }

  toggleMenu() {
    const nav = document.getElementById('headerNav');
    nav?.classList.toggle('menu-open');
  }

  goHome() {
    this.router.navigate(['']);
  }
}
