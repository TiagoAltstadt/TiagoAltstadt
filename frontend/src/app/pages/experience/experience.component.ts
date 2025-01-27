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
      tag: 'Ciencia de Datos e Inteligecia Artificial',
      link: 'https://www.ifts18.edu.ar/carreras/ciencia-de-datos',
      image: 'IFTSN18',
      date: '2022 - 2024',
      description: '',
      current: false,
      category: 'studies',
    },
    {
      tag: 'Ingenieria en Sistemas de Informacion',
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
      description: 'Jefe de cocina. Encargado de pedidos, produccion, horarios y eventos especiales.',
      current: true,
      category: 'cook',
    },
    {
      tag: 'VML - ex Wunderman Thompson',
      link: 'https://www.wundermanthompson.com/es/argentina',
      image: 'wunderman',
      date: '2023 - 2025',
      description:
        'Maquetado web con AEM, implementacion de GA4, accesibilidad y diseño. Correccion de errores y migraciones.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Q&R Solutions',
      link: 'https://gestion-ar.qrsolutions.com.ar/login',
      image: 'qr',
      date: '2022 - 2023',
      description:
        'Fullstack developer, creación de módulos, actualización, migración de tecnologías, deploys y gestión de errores.',
      current: false,
      category: 'developer',
    },
    {
      tag: "Seven's",
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/sevens-restaurant.aspx',
      image: 'sevens',
      date: '2021 - 2022',
      description:
        'Gerente de restaurant. Responsable de supervisar las operaciones diarias, la experiencia del cliente en un entorno de comedor en la montaña y gestionar negocios.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Nybble',
      link: 'https://www.nybblegroup.com/',
      image: 'nybble',
      date: 'Febrero 2020 - Noviembre 2020 ',
      description:
        'Desarrollador fullstack (frontend; luego en una rama experimental probando diferentes herramientas que se adaptaran a las necesidades de nuestros clientes, incluyendo desarrollo móvil, realidad virtual, APIs y desarrollo web)',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Todo Noticias - Artear',
      link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE',
      image: 'tn',
      date: 'Marzo 2020 - Junio 2020 ',
      description:
        'Fullstack developer, gestión de templates de noticias para redactores. Manejo de sprints, bases de datos, seguridad, front y back end.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Digital House',
      link: 'https://www.digitalhouse.com/ar',
      image: 'digital_house',
      date: 'Febrero 2020 - Junio 2020 ',
      description:
        'Frontend developer, maquetado de playground digital para cursos de Latinoamerica.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'The Coop',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/the-coop.aspx',
      image: 'the-coop',
      date: '2019 - 2020',
      description:
        'Líder de equipo. Garantia y control en procurar excelencia en la atencion de un restaurant de alto nivel, desde la produccion de alimentos hasta el final de la experiencia del cliente.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Vista Haus',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/vista-haus.aspx',
      image: 'vista-haus',
      date: '2019 - 2020',
      description:
        'Líder de equipo. Direccion y supervision de cocina en un entorno de alta demanda.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Warehouse - Vail Resorts',
      link: 'https://www.vailresorts.com/',
      image: 'warehouse',
      date: '2019 - 2020',
      description:
        'Encargado de Ubicación. Empleado a tiempo parcial en Warehouse y Limber Grove. Responsable de la produccion de inventarios y atencion al cliente.',
      current: false,
      category: 'other',
    },
    {
      tag: 'Cefiro',
      link: 'https://lamejorpizzeria.com/pizzerias/cefiro/',
      image: 'cefiro',
      date: '2018 (Verano)',
      description:
        'Cocinero y encargado del servicio de mesa. Trabajo temporal, destacado por su cocina de calidad y excelente experiencia al consumidor.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Lucas & Laety',
      link: 'https://www.instagram.com/chez_lucasylaety/',
      image: 'lucas-laety',
      date: '2018 (Invierno)',
      description: 'Mesero. Atencion al cliente y servicio de mesa.',
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
        'Veterinaria Nueva Estrada. Sitio web de veterinaria en Mar del Plata. Diseño y desarrollo de la web, SEO y mantenimiento. Creacion de contenido y gestion de redes sociales.',
      date: '2021 - Hoy',
    },
    {
      tag: 'Val-Bus',
      link: 'https://www.valbuscombis.com',
      image: 'valbus',
      description:
        'Valbus Transporte. Armado, produccion y diseño del sitio web de empresa transportista. SEO y mantenimiento.',
      date: '2024 - Hoy',
    },
  ];
  projects: simpleTabInterface[] = [
    {
      tag: 'Baggu - Ecmmerce',
      link: 'https://github.com/TiagoAltstadt/Baggu-ecommerce/tree/master',
      image: 'baggu',
      description:
        'Proyecto integrador del curso de Programacion Web Full Stack de Digital House.',
      date: '2020',
    },
    {
      tag: 'Snake (C++)',
      link: 'https://github.com/TiagoAltstadt/Snake_cpp',
      image: 'snake',
      description: 'El clasico snake, pero con C++ y casero',
      date: '2019',
    },
    {
      tag: 'File Sorter (Python)',
      link: 'https://github.com/TiagoAltstadt/file-sorter  ',
      image: 'file-sorter',
      description:
        'Pequeño proyecto hecho con python para organizar, modificar y estandarizar grandes cantidades de fotos y videos en una computadora',
      date: '2023',
    },
    {
      tag: 'Calculator (JavaScript)',
      link: 'https://github.com/TiagoAltstadt/Calculator  ',
      image: 'calculator',
      description: 'Calculadora con JS',
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
