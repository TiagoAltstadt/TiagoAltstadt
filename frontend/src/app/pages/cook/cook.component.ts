import { Component } from '@angular/core';
import { simpleTabInterface } from 'src/app/interfaces/simple-tabs';

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.scss'],
})
export class CookComponent {
  work: simpleTabInterface[] = [
    {
      tag: "Seven's",
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/sevens-restaurant.aspx',
      image: 'sevens',
      date: '2021 - 2022',
      description:
        'Gerente de Restaurante - Responsable de supervisar las operaciones diarias, la gestión del equipo y el servicio al cliente en un entorno de comedor en la montaña.',
      current: false,
    },
    {
      tag: 'The Coop',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/the-coop.aspx',
      image: 'the-coop',
      date: '2019 - 2020',
      description:
        'Líder de Equipo - Coordiné equipos para garantizar la eficiencia en la preparación de comidas y el servicio en un restaurante de alto volumen.',
      current: false,
    },
    {
      tag: 'Vista Haus',
      link: 'https://www.breckenridge.com/explore-the-resort/during-your-stay/dining/vista-haus.aspx',
      image: 'vista-haus',
      date: '2019 - 2020',
      description:
        'Líder de Equipo - Dirigí al equipo de cocina y supervisé el servicio en un entorno de alta demanda.',
      current: false,
    },
    {
      tag: 'Warehouse - Vail Resorts',
      link: 'https://www.vailresorts.com/',
      image: 'warehouse',
      date: '2019 - 2020',
      description:
        'Encargado de Ubicación - Empleado a tiempo parcial en Warehouse y Limber Grove. Responsable de la gestión de inventario y la asistencia al cliente.',
      current: false,
    },
    {
      tag: 'Cefiro',
      link: 'https://lamejorpizzeria.com/pizzerias/cefiro/',
      image: 'cefiro',
      date: '2018 (Verano)',
      description:
        'Cocinero y Personal Temporal - Trabajo estacional en un restaurante conocido por su cocina de calidad y servicio al cliente.',
      current: false,
    },
    {
      tag: 'Lucas & Laety',
      link: 'https://www.instagram.com/chez_lucasylaety/',
      image: 'lucas-laety',
      date: '2018 (Invierno)',
      description:
        'Mesero - Servicio al cliente y responsabilidades como camarero en un entorno de restaurante.',
      current: false,
    },
  ];
  
  
}
