import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  @Output() menStatusChange: EventEmitter<any> = new EventEmitter<any>();

  headerOptions = [
    { tag: 'Home', link: '' },
    { tag: 'Dev Exp.', link: 'experience' }, // Will have Work, Studies and Projects
    { tag: 'Cook Exp.', link: 'cook' }, // Will have Work, Studies and Projects
    { tag: 'Bio', link: 'bio' },
    { tag: 'Contact', link: 'contact' },
    { tag: 'Tools', link: '#' },
    { tag: 'Login', link: 'login' },
  ];

  menuStatus: boolean = false;
  user!: UserModel;

  ngOnInit(): void {
    if (this.user.token) {
      this.headerOptions = this.headerOptions.filter(
        (element) => element.link != 'login'
      );
      // this.headerOptions.push({
      //   tag: 'Y.O.ME',
      //   link: 'yome',
      // });
      // if (this.user.userTypeId === 'ADMIN') {
      //   this.headerOptions.push({
      //     tag: 'Admin',
      //     link: 'dev',
      //   });
      // }
      this.headerOptions.push({
        tag: 'Hola ' + this.user.name,
        link: 'profile',
      });
    }
  }
  navigationFunction(link: string) {
    this.router.navigate(['/' + link]);
  }
  hamburguer() {
    if (!this.menuStatus) {
      // If opening
      const header = document.getElementById('header');
      const options = document.getElementById('phone-options');
      if (header) {
        header.style.height = 'fit-content';
      }
      if (options) {
        options.style.display = 'flex';
        options.style.opacity = '1';
      }
    } else {
      // If closing
      const header = document.getElementById('header');
      const options = document.getElementById('phone-options');
      if (header) {
        header.style.height = '60px';
      }
      if (options) {
        options.style.opacity = '0';
        options.style.display = 'none';
      }
    }

    this.menuStatus = !this.menuStatus;
    this.menStatusChange.emit(this.menuStatus);
  }
}
