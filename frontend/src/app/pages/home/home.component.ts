import { Component, OnInit } from '@angular/core';
import { simpleTabInterface } from 'src/app/interfaces/simple-tabs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    texts: string[] = ['Hello', 'Hola', 'Ciao'];
    typingElement: HTMLElement | null = null;
    cursor: HTMLElement | null = null;
    currentTextIndex: number = 0;
    charIndex: number = 0;
    isDeleting: boolean = false;

    ngOnInit() {
        this.typingElement = document.getElementById('typing-text');
        this.cursor = document.createElement('span');
        this.cursor.className = 'cursor';
        this.cursor.innerHTML = '';
        this.typingElement?.appendChild(this.cursor);
        this.type();
    }

    type() {
        if (this.charIndex < this.texts[this.currentTextIndex].length) {
            this.typingElement!.textContent += this.texts[this.currentTextIndex].charAt(this.charIndex);
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
            this.typingElement!.textContent = this.texts[this.currentTextIndex].substring(0, this.charIndex - 1);
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
