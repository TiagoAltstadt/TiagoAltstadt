import { Component } from '@angular/core';
import { simpleTabInterface } from 'src/app/interfaces/simple-tabs';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  work: simpleTabInterface[] = [
    {
      tag: 'VML - ex Wunderman Thompson',
      link: 'https://www.wundermanthompson.com/es/argentina',
      image: 'wunderman',
      date: '2023 - Hoy',
      description:
        'Maquetado web con AEM, Implementacion de GA4, Accesibilidad y diseño. Correccion de errores y  migraciones.',
      current: true,
    },
    {
      tag: 'Q&R Solutions',
      date: '2022 - 2023',
      link: 'https://gestion-ar.qrsolutions.com.ar/login',
      image: 'qr',
      description:
        'Fullstack dev,  creacion de modulos, actualizacion, migracion de tecnologias, deploys y gestion de errores.',
    },
    {
      tag: 'Digital House',
      date: 'Febrero 2020 - Junio 2020 ',
      link: 'https://www.digitalhouse.com/ar',
      image: 'digital_house',
      description:
        'Frontend Dev, Maquetado de playground digital para cursos de Latam.',
    },
    {
      tag: 'Todo Noticias - Artear',
      date: 'Marzo 2020 - Junio 2020 ',
      link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE',
      image: 'tn',
      description:
        'Fullstack dev,  gestion de sistema de templates de noticias para redactores de diario digital, manejo de sprints, bases de datos, seguridad, front y back end. ',
    },
    {
      tag: 'Nybble',
      date: 'Febrero 2020 - Noviembre 2020 ',
      link: 'https://www.nybblegroup.com/',
      image: 'nybble',
      description:
        'Fullstack dev, worked on front end development and after for an experimental branch testing different tools that suited our clients needs, including mobile development, VR, APIS , and web development.',
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
}
