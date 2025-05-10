import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { YomeService } from 'src/app/services/yome.service';
import { ExpenseInterface } from 'src/app/shared/interfaces/expenseInterface';
import { GroupInterface } from 'src/app/shared/interfaces/groupInterface';
import { UserInterface } from 'src/app/shared/interfaces/userInterfce';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
})
export class DevComponent implements OnInit {
  allGroups: GroupInterface[] = [];
  allExpenses: ExpenseInterface[] = [];
  allUsers: UserInterface[] = [];

  constructor(
    private yomeService: YomeService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getUsers();
    this.getExpenses();
    this.getGroups();
  }
  goToYome(){
    this.router.navigate(['/yome']);
  }
  goToShoppingList(){
    this.router.navigate(['/shopping-list']);
  }
  goToFamilyTree(){
    this.router.navigate(['/family-tree']);
  }

  getGroups() {
    this.yomeService.getGroups().subscribe((res: GroupInterface[]) => {
      this.allGroups = res;
    });
  }
  getExpenses() {
    this.yomeService.getExpenses().subscribe((res: ExpenseInterface[]) => {
      this.allExpenses = res;
    });
  }
  getUsers() {
    this.userService.get().subscribe((res: UserInterface[]) => {
      this.allUsers = res;
    });
  }
}
