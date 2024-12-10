import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  texts: string[] = [
    'Welcome to my site!', // English
    'Bienvenido a mi sitio!', // Spanish
    'Benvenuto sul mio sito!', // Italian
    'Bienvenue sur mon site!', // French
    'Willkommen auf meiner Seite!', // German
    'Bem-vindo ao meu site!', // Portuguese
    '私のサイトへようこそ！', // Japanese (Watashi no saito e yōkoso!)
    '내 사이트에 오신 것을 환영합니다!', // Korean (Nae saiteue osin geoseul hwanyeonghamnida!)
    '欢迎来到我的网站！', // Chinese (Huānyíng láidào wǒ de wǎngzhàn!)
    'Добро пожаловать на мой сайт!', // Russian (Dobro pozhalovat' na moy sayt!)
    'Siteme hoş geldiniz!', // Turkish
    'मेरी साइट पर आपका स्वागत है!', // Hindi (Meri site par aapka swagat hai!)
    'مرحبًا بكم في موقعي!', // Arabic (Marhaban bikum fi mawqi'i!)
  ];

  typingElement: HTMLElement | null = null;
  cursor: HTMLElement | null = null;
  currentTextIndex: number = 0;
  charIndex: number = 0;
  isDeleting: boolean = false;

  ngOnInit() {
    this.typingElement = document.getElementById('typing-text');
    this.cursor = document.createElement('span');
    this.cursor.className = 'cursor';
    this.cursor.innerHTML = '|'; // Add cursor display
    this.typingElement?.appendChild(this.cursor);
    this.type();
  }

  type() {
    const currentTextWithSpace = this.texts[this.currentTextIndex]; // Add space at the end
    if (this.charIndex < currentTextWithSpace.length) {
      this.typingElement!.textContent =
        currentTextWithSpace.substring(0, this.charIndex + 1) + '_'; // Include blank space
      this.charIndex++;
      setTimeout(() => this.type(), 150); // Typing speed
    } else {
      this.cursor!.style.display = 'none'; // Hide cursor when done typing
      setTimeout(() => {
        this.isDeleting = true;
        this.delete();
      }, 1000); // Wait before starting to delete
    }
  }

  delete() {
    if (this.charIndex > 0) {
      this.typingElement!.textContent =
        this.texts[this.currentTextIndex].substring(0, this.charIndex - 1) +
        '_'; // Include blank space
      this.charIndex--;
      setTimeout(() => this.delete(), 100); // Deleting speed
    } else {
      this.cursor!.style.display = 'inline-block'; // Show cursor again
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length; // Cycle through texts
      setTimeout(() => {
        this.isDeleting = false;
        this.type();
      }, 1000); // Wait before starting to type next text
    }
  }
}
