import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YomeService } from 'src/app/services/yome.service';
import { ExpenseInterface } from 'src/app/shared/interfaces/expenseInterface';
import { GroupInterface } from 'src/app/shared/interfaces/groupInterface';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
})
export class DevComponent {
  allGroups: GroupInterface[] = [];
  allExpenses: ExpenseInterface[] = [];

  constructor(private yomeService: YomeService) {}

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
}
