import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { USERS_URL, YOME_URL } from '../shared/constants/urls';
import { UserModel } from '../shared/models/User';
import {
  LoginUserInterface,
  UserInterface,
} from '../shared/interfaces/userInterfce';
import { GroupModel } from '../shared/models/Group';
import { ExpenseModel } from '../shared/models/Expense';
import { GroupInterface } from '../shared/interfaces/groupInterface';
import { ExpenseInterface } from '../shared/interfaces/expenseInterface';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class YomeService {
  private userSubject = new BehaviorSubject<UserModel>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<UserModel>;
  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }
  private setUserToLocalStorage(user: UserModel) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  private getUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(USER_KEY);

    if (userJson) return JSON.parse(userJson) as UserModel;
    return new UserModel();
  }

  getExpenses(): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(YOME_URL + '/expenses');
  }
  getGroups(): Observable<GroupInterface[]> {
    return this.http.get<GroupInterface[]>(YOME_URL + '/groups');
  }
  deleteGroup(groupId: string): Observable<GroupInterface[]> {
    return this.http.delete<GroupInterface[]>(YOME_URL + '/group/' + groupId);
  }
  deleteExpense(expenseId: string): Observable<ExpenseInterface[]> {
    return this.http.delete<ExpenseInterface[]>(
      YOME_URL + '/expense/' + expenseId
    );
  }
  getUserExpenses(userId: string) {
    return this.http.get<ExpenseInterface[]>(
      YOME_URL + '/expenses/user/' + userId
    );
  }

  createGroup(groupBody: GroupInterface): Observable<GroupModel> {
    return this.http
      .post<GroupModel>(YOME_URL + '/createGroup', groupBody)
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
}
