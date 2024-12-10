import { Component } from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent {
  technologies = [
    { name: 'Angular', link: 'https://angular.io/' },
    { name: 'HTML and CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'Node Js', link: 'https://nodejs.org/' },
    { name: 'Git', link: 'https://git-scm.com/' },
    { name: 'Javascript', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Postman', link: 'https://www.postman.com/' },
    { name: 'Typescript', link: 'https://developer.mozilla.org/en-US/docs/Glossary/TypeScript' },
    { name: 'Express', link: 'https://expressjs.com/' },
    { name: 'Creation of APIs', link: 'https://developer.mozilla.org/en-US/docs/Web/API' },
    { name: 'Sequelize', link: 'https://sequelize.org/' },
    { name: 'C++', link: 'https://en.cppreference.com/w/' },
    { name: 'React', link: 'https://reactjs.org/' },
    { name: 'MVC Architecture', link: 'https://developer.mozilla.org/en-US/docs/Glossary/MVC' },
    { name: 'OOP', link: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' },
    { name: 'MySQL', link: 'https://www.mysql.com/' },
    { name: 'VSCode', link: 'https://code.visualstudio.com/' },
    { name: 'Scrum', link: 'https://www.scrum.org/' },
];


}
