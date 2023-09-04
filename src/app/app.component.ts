import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tiagoaltstadt';
  projects = [
    { tag: 'Project 1', link: '#' },
    { tag: 'Project 2', link: '#' },
    { tag: 'Project 3', link: '#' },
    { tag: 'Project 4', link: '#' },
    { tag: 'Project 5', link: '#' },
    { tag: 'Project 6', link: '#' },
    { tag: 'Project 6', link: '#' },
    { tag: 'Project 6', link: '#' },
    { tag: 'Project 6', link: '#' },
    { tag: 'Project 6', link: '#' },
    { tag: 'Project 6', link: '#' },
  ]
  headerOptions = [
    { tag: '🌙', link: '#' },
    { tag: 'Home', link: '#' },
    { tag: 'Projects', link: '#' },
    { tag: 'Bio', link: '#' },
    { tag: 'Experience', link: '#' },
    { tag: 'Studies', link: '#' },
    { tag: 'Misc', link: '#' },
    { tag: 'Contact', link: '#' },
  ]
}
