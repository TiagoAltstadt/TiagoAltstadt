import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  headerOptions = [
    { tag: 'Experience', link: '#experience' }, // Will have Work, Studies and Projects
    { tag: 'Bio', link: '/bio' },
    { tag: 'Contact', link: '/contact' },
    { tag: 'Misc', link: '/misc' },
    { tag: '🌙', link: '#' },
  ]

}
