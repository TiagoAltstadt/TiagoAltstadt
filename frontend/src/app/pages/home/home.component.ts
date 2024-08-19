import { Component, OnInit } from '@angular/core';
import { simpleTabInterface } from 'src/app/interfaces/simple-tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  textToType: string = '';
  typingSpeed: number = 50; // Adjust typing speed (milliseconds per character)
  typingElement: HTMLElement | null = null;
  charIndex: number = 0;
  cycles = 0;
  imageLoaded = false;

  ngOnInit() {
    this.writeThis('Hello world!', 'hello');
    setTimeout(() => {
      this.writeThis('My name is Tiago Altstadt.', 'name');
    }, 1200);
    setTimeout(() => {
      this.typingSpeed = 25;
      this.writeThis(
        "I'm a Full Stack Web Developer, I made this page/project, and many more. But this one is special, this one serves two main porposes: your first impression of me, and indexing all my relevant information. But if  you stay here long enough, you may find I have some other funny things going around here...",
        'presentation'
      );
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
        this.typingElement.textContent += this.textToType.charAt(
          this.charIndex
        );
        this.charIndex++;
      }
      setTimeout(() => this.typeText(), this.typingSpeed);
    }
  }
}
