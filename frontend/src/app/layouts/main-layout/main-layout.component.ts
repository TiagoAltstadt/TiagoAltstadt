import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  headerOptions = [
    { tag: 'Home', link: '' },
    { tag: 'Experience', link: 'experience' }, // Will have Work, Studies and Projects
    { tag: 'Bio', link: 'bio' },
    { tag: 'Contact', link: 'contact' },
    { tag: 'Login', link: 'login' },
    // { tag: '🌙', link: '#' },
  ];
  menuState: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.clear();
    setTimeout(() => {
      console.clear();
      console.log(
        '%c⚡Hello, My name is Tiago Altstadt and I developed this site, and a lot of other stuff, reach out to me if you wanna find out more!',
        'color:#1cce69; background: #3d09bf; font-size: 1.5rem; padding: 0.15rem 0.25rem; margin: 1rem; font-family: Helvetica; border: 2px solid #1cce69; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #0a0121; font-style: italic;'
      );
    }, 1000);
  }

  navigationFunction(link: string) {
    this.router.navigate(['/' + link]);
    console.log('/' + link);
  }

  toggleMenu(state: boolean) {
    this.menuState = state;
  }
}
