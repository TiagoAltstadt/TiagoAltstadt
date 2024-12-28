import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUserFromLocalStorage();
    if (user && user.userTypeId === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/']);
      console.info(
        `\n%c⚠️ Warning ⚠️%c \n You are not an admin,\n you cant go there.\n\n%c`,
        "color:#ceb73f; background: #ceb73f33; font-size:1.5rem; padding:0.15rem; margin: 1rem auto; font-family: Rockwell, Tahoma, 'Trebuchet MS', Helvetica; border: 2px solid #ceb73f; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #000000bf;",
        'font-weight: bold; font-size: 1rem;color: #ceb73f;',
        "color: #ceb73f; font-size: 0.75rem; font-family: Tahoma, 'Trebuchet MS', Helvetica;"
      );

      return false;
    }
  }
}
