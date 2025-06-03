import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare function gtag(command: string, target: string, config?: any): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tiagoaltstadt';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-RF3VQ2Q70D', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
