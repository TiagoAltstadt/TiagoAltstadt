import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { YOME_URL } from '../shared/constants/urls';
import { GroupModel } from '../shared/models/Group';
import { UserInterface } from '../shared/interfaces/userInterfce';
import { ExpenseModel } from '../shared/models/Expense';
import { GroupInterface } from '../shared/interfaces/groupInterface';
import { ExpenseInterface } from '../shared/interfaces/expenseInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(YOME_URL + '/expenses');
  }
  getGroups(): Observable<GroupModel[]> {
    return this.http.get<GroupModel[]>(YOME_URL + '/groups');
  }

  createGroup(groupBody: GroupInterface): Observable<GroupModel> {
    return this.http
      .post<GroupModel>(YOME_URL + '/createNewGroup', groupBody)
      .pipe(
        tap({
          next: (res) => {
            console.log('Group created', res);
            return;
          },
          error: (errorResponse) => {
            console.log('Error', errorResponse);
            return;
          },
        })
      );
  }
  createExpense(expenseBody: ExpenseInterface): Observable<ExpenseModel> {
    return this.http
      .post<ExpenseModel>(YOME_URL + '/createNewGroup', expenseBody)
      .pipe(
        tap({
          next: (res) => {
            console.log('Expense created', res);
            return;
          },
          error: (errorResponse) => {
            console.log('Error', errorResponse);
            return;
          },
        })
      );
  }

  deleteGroup(id: string): Observable<GroupModel> {
    return this.http.delete<GroupModel>(YOME_URL + id).pipe(
      tap({
        next: (res) => {
          console.log('Expense deleted', res);
          return;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return;
        },
      })
    );
  }
  deleteExpense(id: string): Observable<GroupModel> {
    return this.http.delete<GroupModel>(YOME_URL + id).pipe(
      tap({
        next: (res) => {
          console.log('Expense deleted', res);
          return;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return;
        },
      })
    );
  }

  patchGroup(
    groupBody: GroupInterface,
    groupID: string
  ): Observable<GroupModel> {
    let body: GroupModel = {
      name: groupBody.name,
      description: groupBody.description,
      members: groupBody.members,
      expenses: groupBody.expenses,
      createdAt: groupBody.createdAt,
      updatedAt: groupBody.updatedAt,
    };

    return this.http
      .patch<GroupModel>(YOME_URL + '/group/' + groupID, body)
      .pipe(
        tap({
          next: (res) => {
            console.log('Group updated', res);
            return;
          },
          error: (errorResponse) => {
            console.log('Error', errorResponse);
            return;
          },
        })
      );
  }
  patchExpense(
    expensepBody: ExpenseInterface,
    groupID: string
  ): Observable<ExpenseModel> {
    let body: ExpenseModel = {
      amount: expensepBody.amount,
      paidBy: expensepBody.paidBy,
      title: expensepBody.title,
      payers: expensepBody.payers,
    };

    return this.http
      .patch<ExpenseModel>(YOME_URL + '/expense/' + groupID, body)
      .pipe(
        tap({
          next: (res) => {
            console.log('Group updated', res);
            return;
          },
          error: (errorResponse) => {
            console.log('Error', errorResponse);
            return;
          },
        })
      );
  }

  // REVISED------------------

  delete(id: string): Observable<GroupModel> {
    return this.http.delete<GroupModel>(YOME_URL + id).pipe(
      tap({
        next: (res) => {
          console.log('User deleted', res);
          return;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return;
        },
      })
    );
  }
  searchById(id: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(YOME_URL + id, {}).pipe(
      tap({
        next: (res) => {
          console.log('User found', res);
          return;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return;
        },
      })
    );
  }
}
