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
      date: '2022 - Today',
      description: 'Currently studying topics like machine learning, data analysis, and AI systems. My goal with this program is to strengthen my understanding of data-driven technologies and how to apply them in real-world applications.',
      current: true,
      category: 'studies',
    },
    {
      tag: 'Data Systems Engineering',
      link: 'https://utn.edu.ar/es/federacion-universitaria-tecnologica/feria-de-carreras/sistemas-de-informacion',
      image: 'utn',
      date: '2018 - 2021',
      description: 'Studied two years of computer systems engineering, where I built a foundation in programming, systems design, and database management. This experience helped confirm my interest in software development and technology.',
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
      description: 'Gained a solid understanding of cloud computing concepts and AWS services. This certification helped me work with cloud-based architectures and collaborate better on cloud-native projects.',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Argentina Programa',
      link: 'https://mumuki.io/argentina-programa/certificates/verify/8NsU1Yaq1p0msb2f',
      image: 'argentina-programa',
      date: '2021',
      description: 'Completed this national program focused on software development fundamentals. It sharpened my coding logic and introduced me to industry best practices.',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Fullstack Developer - Digital House',
      link: 'https://drive.google.com/file/d/1nzJOekb5n5t-aotsrA3TUekf6F9tU5tS/view?usp=sharing',
      image: 'digital-house',
      date: '2020',
      description: 'Trained in full-stack development with hands-on projects using modern web technologies. Built complete web apps using front-end and back-end tools.',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Master Hibernate and JPA with Spring Boot in 100 Steps',
      link: 'https://www.udemy.com/certificate/UC-49ecfbc6-d8ec-448c-b355-640db81838df/',
      image: 'hibernate',
      date: '2021',
      description: 'Learned to integrate Java applications with databases using Hibernate and JPA. Strengthened my ability to manage persistent data in Spring Boot projects.',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Mercado Pago Certified Developer',
      link: 'https://drive.google.com/file/d/1yUV09CIRpA46kT3WWYKV1HeWhdlaloSM/view?usp=sharing',
      image: 'mercado-pago',
      date: '2020',
      description: 'Got certified in integrating Mercado Pago APIs for online payments. Learned to handle e-commerce transactions and improve user payment flows.',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Learn and Understand AngularJS',
      link: 'https://www.udemy.com/certificate/UC-MKQZNHH6/',
      image: 'angularjs',
      date: '2020',
      description: 'Took a deep dive into AngularJS, learning how to build dynamic single-page apps. It laid the foundation for my later work with modern Angular.',
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
        'At VML I worked mainly as a front-end developer, collaborating closely with UX and UI designers to bring designs to life for major clients like Colgate. I was responsible for building and updating pages using Adobe Experience Manager (AEM), often working with Vanilla JavaScript to get the functionality just right.<br><br> One of my key responsibilities was handling content implementation and migrations, especially during platform upgrades. I also helped integrate and validate tracking using Google Analytics 4 (GA4), making sure that what we built could actually be measured and optimized.<br><br> A lot of my day-to-day involved maintaining large-scale websites, fixing bugs, and making sure everything ran smoothly on the front end — from layout to performance. It was a role that required both attention to detail and collaboration across design and tech teams.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Q&R Solutions',
      link: 'https://gestion-ar.qrsolutions.com.ar/login',
      image: 'qr',
      date: '2022 - 2023',
      description:
        'At Q&R I worked mainly as a front-end developer, but I also got involved in some back-end tasks from time to time. My day-to-day involved creating and updating Angular components, fixing bugs, and building new sections of the website from scratch.<br><br>I collaborated closely with both designers and back-end developers, often working on experimental features or branches that required a bit of creative problem-solving. I used Jenkins for deployments and testing, and was also responsible for diagnosing issues that came up during builds or in production.<br><br>A big part of my role was making sure the UI stayed clean, responsive, and scalable — whether that meant refactoring existing code or building something new to fit the needs of the project.',
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
        'At Nybble Group I started in a more experimental team, where we worked closely with clients who had very open-ended needs. Our job was to explore the latest technologies and help shape a stack that actually fit their goals — even when those goals weren’t fully clear at the start.<br><br> In that phase, I got to work across the full stack: back-end, databases, front-end (mostly with React and Angular), mobile development, and even some VR and cross-platform tools. It was a very creative and hands-on environment where we were expected to research, test, and build prototypes quickly.<br><br>Later on, I moved to a more stable front-end-focused team, working on an insurance platform for a U.S. client. There I focused on developing and updating Angular components, maintaining UI consistency, and contributing to the general upkeep of the site.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Todo Noticias - Artear',
      link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE',
      image: 'tn',
      date: 'March 2020 - June 2020 ',
      description:
        'At Todo Noticias, I was brought in to kick off the first internal development team for the journalism department. At first, the role wasn’t clearly defined, but after talking with the journalists, I started identifying key needs for tools that would make their day-to-day work easier.<br><br>I ended up designing and building several custom web tools tailored to specific editorial use cases — for example, an app that let them dynamically create player lists for sports coverage (like FIFA rosters) and embed them on the website via iframe. These tools were built to be reused, adapted, and updated by the team without needing technical help.<br><br>This was my first full-stack project built entirely from scratch — I handled the front-end, back-end, database integration, user permissions, and overall security. It was a great opportunity to learn how to develop complete solutions that solve real-world editorial problems.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Digital House',
      link: 'https://www.digitalhouse.com/ar',
      image: 'digital_house',
      date: 'February 2020 - June 2020 ',
      description:
        'This was my first role as a web programmer, working closely with teachers, professors, and UX/UI designers to build an educational platform for Digital House’s digital playground across Latin America.<br><br>My main responsibility was to turn their designs and course plans into fully functional web components using HTML, CSS, and JavaScript. Every day I’d log in, review their requirements, and develop the different stages and exam phases they needed.<br><br>Once the components were ready, we tested them with the teachers to ensure everything worked smoothly. When approved, my work became part of the platform used by thousands of students across the region.<br><br>This job gave me valuable experience working in a collaborative environment and delivering production-ready web features.',
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
      date: '2021 - Present',
      description: 'Led the digital transformation of a traditional veterinary practice in Mar del Plata. Designed and developed their official website and created a custom management system for client records, pet histories, stock control, and online appointment scheduling. Provided ongoing support and feature improvements tailored to their workflow.',
    },
    {
      tag: 'Val-Bus',
      link: 'https://www.valbuscombis.com',
      image: 'valbus',
      date: '2024 - Present',
      description: 'Currently working as the sole developer for a national transportation company. Built and deployed a responsive landing page with all essential service information. Collaborating directly with stakeholders to scale the platform and integrate future booking and scheduling features.',
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
