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
      tag: 'Wunderman Thompson',
      link: 'https://www.wundermanthompson.com/es/argentina',
      image: 'wunderman',
      current: true,
    },
    {
      tag: 'Q&R Solutions',
      link: 'https://gestion-ar.qrsolutions.com.ar/login',
      image: 'qr',
    },
    {
      tag: 'Digital House',
      link: 'https://www.digitalhouse.com/ar',
      image: 'digital_house',
    },
    {
      tag: 'Todo Noticias - Artear',
      link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE',
      image: 'tn',
    },
    { tag: 'Nybble', link: 'https://www.nybblegroup.com/', image: 'nybble' },
  ];
  freelance: simpleTabInterface[] = [
    {
      tag: 'Veterinaria Nueva Estrada',
      link: 'https://www.veterinarianuevaestrada.com',
      image: 'veterinaria',
    },
    { tag: 'Val-Bus', link: 'https://www.valbuscombis.com', image: 'valbus' },
  ];
  projects: simpleTabInterface[] = [
    {
      tag: 'Baggu - Ecmmerce',
      link: 'https://github.com/TiagoAltstadt/Baggu-ecommerce/tree/master',
      image: 'baggu',
    },
    {
      tag: 'Snake (C++)',
      link: 'https://github.com/TiagoAltstadt/Snake_cpp',
      image: 'snake',
    },
    {
      tag: 'Calculator (JavaScript)',
      link: 'https://github.com/TiagoAltstadt/Calculator  ',
      image: 'calculator',
    },
  ];
}
