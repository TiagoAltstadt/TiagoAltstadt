import { Component, OnInit } from '@angular/core';
import { simpleTabInterface } from 'src/app/interfaces/simple-tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  work: simpleTabInterface[] = [
    { tag: 'Wunderman Thompson', link: 'https://www.wundermanthompson.com/es/argentina', image: 'wunderman' },
    { tag: 'Q&R Solutions', link: 'https://gestion-ar.qrsolutions.com.ar/login', image: 'qr' },
    { tag: 'Digital House', link: 'https://www.digitalhouse.com/ar', image: 'digital_house' },
    { tag: 'Todo Noticias - Artear', link: 'https://tn.com.ar/?gclid=CjwKCAjwo9unBhBTEiwAipC11yPdNv-NnOkUbIjxoy0pPg17-b0QMN7dma1qzbIXPHwWVw18bXijHhoC46cQAvD_BwE', image: 'tn' },
    { tag: 'Nybble', link: 'https://www.nybblegroup.com/', image: 'nybble' },
    { tag: 'Veterinaria Nueva Estrada', link: 'http://www.veterinarianuevaestrada.com', image: 'veterinaria' },
  ]
  projects: simpleTabInterface[] = [
    { tag: 'Baggu - Ecmmerce', link: 'https://github.com/TiagoAltstadt/Baggu-ecommerce/tree/master', image: 'baggu' },
    { tag: 'Snake (C++)', link: 'https://github.com/TiagoAltstadt/Snake_cpp', image: 'snake' },
    { tag: 'Calculator (JavaScript)', link: 'https://github.com/TiagoAltstadt/Calculator  ', image: 'calculator' },
  ]

  textToType: string = "";
  typingSpeed: number = 50; // Adjust typing speed (milliseconds per character)
  typingElement: HTMLElement | null = null;
  charIndex: number = 0;
  cycles = 0;

  ngOnInit() {

    this.writeThis('Hello world!', 'hello');
    setTimeout(() => {
      this.writeThis('My name is Tiago Altstadt.', 'name');
    }, 1200);
    setTimeout(() => {
      this.typingSpeed = 25;
      this.writeThis("I'm a Full Stack Web Developer, I made this page/project, and many more. But this one is special, this one serves two main porposes: your first impression of me, and indexing all my relevant information. But if  you stay here long enough, you may find I have some other funny things going around here...", 'presentation');
    }, 2900);

  }

  writeThis(textValue: string, textId: string) {
    this.charIndex = 0;
    this.textToType = textValue;
    this.typingElement = document.getElementById(textId);
    this.typeText();
  }

  typeText() {
    if (this.charIndex < this.textToType.length) {
      if (this.typingElement) {
        this.typingElement.textContent += this.textToType.charAt(this.charIndex);
        this.charIndex++;
      }
      setTimeout(() => this.typeText(), this.typingSpeed);
    }
  }

}
