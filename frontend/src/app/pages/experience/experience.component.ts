import { Component } from '@angular/core';
import { simpleTabInterface } from 'src/app/interfaces/simple-tabs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  toggleDev: boolean = true;
  toggleCook: boolean = false;
  toggleCourses: boolean = true;
  toggleStudies: boolean = true;
  studies: simpleTabInterface[] = [
    {
      tag: 'Data Science & Artificial Intelligence',
      link: 'https://www.ifts18.edu.ar/carreras/ciencia-de-datos',
      image: 'IFTSN18',
      date: '2022 - 2024',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Data Systems Engineering',
      link: 'https://utn.edu.ar/es/federacion-universitaria-tecnologica/feria-de-carreras/sistemas-de-informacion',
      image: 'utn',
      date: '2018 - 2021',
      description: '',
      current: false,
      category: 'studies',
    },
  ];
  courses: simpleTabInterface[] = [
    {
      tag: 'AWS Cloud Practitioner',
      link: 'https://credentials.itcollege.com.ar/e9e5e980-674d-41fe-aead-ac6100a0870c#acc.xydhXIVY',
      image: 'itcollege',
      date: '2022',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Argentina Programa',
      link: 'https://mumuki.io/argentina-programa/certificates/verify/8NsU1Yaq1p0msb2f',
      image: 'argentina-programa',
      date: '2021',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Fullstack Developer -Digital House',
      link: 'https://drive.google.com/file/d/1nzJOekb5n5t-aotsrA3TUekf6F9tU5tS/view?usp=sharing',
      image: 'digital-house',
      date: '2020',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Master Hibernate and JPA with Spring Boot in 100 Steps',
      link: 'https://www.udemy.com/certificate/UC-49ecfbc6-d8ec-448c-b355-640db81838df/',
      image: 'hibernate',
      date: '2021',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Mercado Pago Certified Developer',
      link: 'https://drive.google.com/file/d/1yUV09CIRpA46kT3WWYKV1HeWhdlaloSM/view?usp=sharing',
      image: 'mercado-pago',
      date: '2020',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Learn and Understand AngularJS',
      link: 'https://www.udemy.com/certificate/UC-MKQZNHH6/',
      image: 'angularjs',
      date: '2020',
      description: '',
      current: false,
      category: 'studies',
    },
  ];
  work: simpleTabInterface[] = [
    {
      tag: 'Burger Brothers Tarter',
      link: 'http://www.burgerbrothersandorra.com/',
      image: 'burger-brothers',
      date: '2024-2025',
      description:
        'Head chef. In charge of orders, production, scheduling, and special events.',
      current: true,
      category: 'cook',
    },
    {
      tag: 'VML - ex Wunderman Thompson',
      link: 'https://www.wundermanthompson.com/es/argentina',
      image: 'wunderman',
      date: '2023 - 2025',
      description:
        'Maintained and authored web content using AEM. Implemented analytics tracking with Google Analytics 4 (GA4). Led front-end content updates and handled bug tracking and resolution. Supported platform migrations and tech stack upgrades for high-traffic websites.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Q&R Solutions',
      link: 'https://gestion-ar.qrsolutions.com.ar/login',
      image: 'qr',
      date: '2022 - 2023',
      description:
        'Developed and deployed scalable UI components using Angular and modern JavaScript frameworks. Executed code migrations and version control using Git and Bitbucket. Diagnosed and resolved application bugs and deployment issues.',
      current: false,
      category: 'developer',
    },
    {
      tag: "Seven's",
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/sevens-restaurant.aspx',
      image: 'sevens',
      date: '2021 - 2022',
      description:
        'Restaurant Manager. Responsible for overseeing daily operations, customer experience in a mountain dining environment, and business management.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Nybble',
      link: 'https://www.nybblegroup.com/',
      image: 'nybble',
      date: 'February 2020 - November 2020 ',
      description:
        'Contributed to full-cycle software development, from prototyping to deployment across multiple client projects. Experimented with new tools including VR, APIs, and cross-platform solutions to fit client needs.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Todo Noticias - Artear',
      link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE',
      image: 'tn',
      date: 'March 2020 - June 2020 ',
      description:
        'Developed and maintained a digital news system, improving workflow and security. Managed database integration and led sprint planning for team coordination. Implemented secure data handling practices for high-volume news content. ',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Digital House',
      link: 'https://www.digitalhouse.com/ar',
      image: 'digital_house',
      date: 'February 2020 - June 2020 ',
      description:
        'Designed and implemented UI components for an educational platform. ',
      current: false,
      category: 'developer',
    },
    {
      tag: 'The Coop',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/the-coop.aspx',
      image: 'the-coop',
      date: '2019 - 2020',
      description:
        'Team Leader. Ensures and controls excellence in the service of a high-end restaurant, from food production to the end of the customer experience.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Vista Haus',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/vista-haus.aspx',
      image: 'vista-haus',
      date: '2019 - 2020',
      description:
        'Team Leader. Kitchen management and supervision in a high-demand environment.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Warehouse - Vail Resorts',
      link: 'https://www.vailresorts.com/',
      image: 'warehouse',
      date: '2019 - 2020',
      description:
        'Location Manager. Part-time employee at Warehouse and Limber Grove. Responsible for inventory production and customer service.',
      current: false,
      category: 'other',
    },
    {
      tag: 'Cefiro',
      link: 'https://lamejorpizzeria.com/pizzerias/cefiro/',
      image: 'cefiro',
      date: '2018 (Summer)',
      description:
        'Cook and table service manager. Seasonal position, recognized for its quality cuisine and excellent customer experience.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Lucas & Laety',
      link: 'https://www.instagram.com/chez_lucasylaety/',
      image: 'lucas-laety',
      date: '2018 (Winter)',
      description: 'Waiter. Customer service and table service.',
      current: false,
      category: 'cook',
    },
  ];
  freelance: simpleTabInterface[] = [
    {
      tag: 'Veterinaria Nueva Estrada',
      link: 'https://www.veterinarianuevaestrada.com',
      image: 'veterinaria',
      description:
        'Designed the full architecture of a veterinary management system from concept to delivery. Implemented appointment scheduling features and developed a responsive, user-friendly UI. Coordinated directly with stakeholders for ongoing improvements and scalability. ',
      date: '2021 - Present',
    },
    {
      tag: 'Val-Bus',
      link: 'https://www.valbuscombis.com',
      image: 'valbus',
      description:
        'Sole developer responsible for the full lifecycle of a transportation booking system using the MEAN stack. Conducted continuous deployment, feature expansion, and server maintenance. ',
      date: '2024 - Present',
    },
  ];
  projects: simpleTabInterface[] = [
    {
      tag: 'Baggu - Ecmmerce',
      link: 'https://github.com/TiagoAltstadt/Baggu-ecommerce/tree/master',
      image: 'baggu',
      description:
        'Integrating project for the Digital House Full Stack Web Programming course.',
      date: '2020',
    },
    {
      tag: 'Snake (C++)',
      link: 'https://github.com/TiagoAltstadt/Snake_cpp',
      image: 'snake',
      description: 'The classic Snake, but with C++.',
      date: '2019',
    },
    {
      tag: 'File Sorter (Python)',
      link: 'https://github.com/TiagoAltstadt/file-sorter  ',
      image: 'file-sorter',
      description:
        'Small project made with Python to organize, modify and standardize large amounts of photos and videos on a computer.',
      date: '2023',
    },
    {
      tag: 'Calculator (JavaScript)',
      link: 'https://github.com/TiagoAltstadt/Calculator  ',
      image: 'calculator',
      description: 'Calculator with JS',
      date: '2018',
    },
  ];

  toggleDevFunc() {
    this.toggleDev = !this.toggleDev;
  }
  toggleCookFunc() {
    this.toggleCook = !this.toggleCook;
  }
  toggleStudiesFunc() {
    this.toggleStudies = !this.toggleStudies;
  }
  toggleCoursesFunc() {
    this.toggleCourses = !this.toggleCourses;
  }
}
