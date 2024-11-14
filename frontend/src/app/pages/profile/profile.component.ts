import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: UserModel;

  constructor(private userService: UserService, private router: Router) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
  ngOnInit() {
    if (!this.user.token) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.userService.logout();
  }
}
