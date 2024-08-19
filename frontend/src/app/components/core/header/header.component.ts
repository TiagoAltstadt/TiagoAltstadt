import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  @Input() headerOptions: any;
  @Output() menStatusChange: EventEmitter<any> = new EventEmitter<any>();


  menuStatus: boolean = false;

  navigationFunction(link: string) {
    this.router.navigate(['/' + link]);

  }
  hamburguer(){
    this.menuStatus = !this.menuStatus;
    this.menStatusChange.emit(this.menuStatus);
  }
}
