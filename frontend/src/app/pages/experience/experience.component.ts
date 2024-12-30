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
  work: simpleTabInterface[] = [
    {
      tag: 'VML - ex Wunderman Thompson',
      link: 'https://www.wundermanthompson.com/es/argentina',
      image: 'wunderman',
      date: '2023 - 2025',
      description:
        'Maquetado web con AEM, Implementacion de GA4, Accesibilidad y diseño. Correccion de errores y migraciones.',
      current: true,
      category: 'developer',
    },
    {
      tag: 'Q&R Solutions',
      link: 'https://gestion-ar.qrsolutions.com.ar/login',
      image: 'qr',
      date: '2022 - 2023',
      description:
        'Fullstack dev, creación de módulos, actualización, migración de tecnologías, deploys y gestión de errores.',
      current: false,
      category: 'developer',
    },
    {
      tag: "Seven's",
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/sevens-restaurant.aspx',
      image: 'sevens',
      date: '2021 - 2022',
      description:
        'Gerente de Restaurante - Responsable de supervisar las operaciones diarias, la gestión del equipo y el servicio al cliente en un entorno de comedor en la montaña.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Digital House',
      link: 'https://www.digitalhouse.com/ar',
      image: 'digital_house',
      date: 'Febrero 2020 - Junio 2020 ',
      description:
        'Frontend Dev, Maquetado de playground digital para cursos de Latam.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Todo Noticias - Artear',
      link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE',
      image: 'tn',
      date: 'Marzo 2020 - Junio 2020 ',
      description:
        'Fullstack dev, gestión de sistema de templates de noticias para redactores de diario digital, manejo de sprints, bases de datos, seguridad, front y back end.',
      current: false,
      category: 'developer',
    },
    {
      tag: 'Nybble',
      link: 'https://www.nybblegroup.com/',
      image: 'nybble',
      date: 'Febrero 2020 - Noviembre 2020 ',
      description:
        'Fullstack dev, worked on front end development and after for an experimental branch testing different tools that suited our clients needs, including mobile development, VR, APIS , and web development.',
      current: false,
      category: 'developer',
    },

    {
      tag: 'The Coop',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/the-coop.aspx',
      image: 'the-coop',
      date: '2019 - 2020',
      description:
        'Líder de Equipo - Coordiné equipos para garantizar la eficiencia en la preparación de comidas y el servicio en un restaurante de alto volumen.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Vista Haus',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/vista-haus.aspx',
      image: 'vista-haus',
      date: '2019 - 2020',
      description:
        'Líder de Equipo - Dirigí al equipo de cocina y supervisé el servicio en un entorno de alta demanda.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Warehouse - Vail Resorts',
      link: 'https://www.vailresorts.com/',
      image: 'warehouse',
      date: '2019 - 2020',
      description:
        'Encargado de Ubicación - Empleado a tiempo parcial en Warehouse y Limber Grove. Responsable de la gestión de inventario y la asistencia al cliente.',
      current: false,
      category: 'other',
    },
    {
      tag: 'Cefiro',
      link: 'https://lamejorpizzeria.com/pizzerias/cefiro/',
      image: 'cefiro',
      date: '2018 (Verano)',
      description:
        'Cocinero y Personal Temporal - Trabajo estacional en un restaurante conocido por su cocina de calidad y servicio al cliente.',
      current: false,
      category: 'cook',
    },
    {
      tag: 'Lucas & Laety',
      link: 'https://www.instagram.com/chez_lucasylaety/',
      image: 'lucas-laety',
      date: '2018 (Invierno)',
      description:
        'Mesero - Servicio al cliente y responsabilidades como camarero en un entorno de restaurante.',
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
        'Veterinaria Nueva estrada, Inicia sesion para sacar tu turno!',
      date: '2021 - Hoy',
    },
    {
      tag: 'Val-Bus',
      link: 'https://www.valbuscombis.com',
      image: 'valbus',
      description: 'Valbus Transporte, agenda tu proximo viaje!',
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
}
