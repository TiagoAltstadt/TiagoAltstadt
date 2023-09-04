import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  headerOptions = [
    { tag: '🌙', link: '#' },
    { tag: 'Home', link: '' },
    { tag: 'Projects', link: '/projects' },
    { tag: 'Bio', link: '/bio' },
    { tag: 'Experience', link: '/experience' },
    { tag: 'Studies', link: '/studies' },
    { tag: 'Misc', link: '/misc' },
    { tag: 'Contact', link: '/contact' },
  ]
}
