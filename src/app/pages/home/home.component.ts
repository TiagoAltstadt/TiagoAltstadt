import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  projects = [
    { tag: 'Project 1', link: '#' },
    { tag: 'Project 2', link: '#' },
    { tag: 'Project 3', link: '#' },
    { tag: 'Project 4', link: '#' },

  ]

}
