import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { USERS_URL } from '../shared/constants/urls';
import { UserModel } from '../shared/models/User';
import {
  LoginUserInterface,
  UserInterface,
} from '../shared/interfaces/userInterfce';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  public getUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(USER_KEY);

    if (userJson) {
      return JSON.parse(userJson) as UserModel;
    }
    return new UserModel();
  }

  get(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(USERS_URL);
  }
  post(userBody: UserInterface): Observable<UserModel> {
    return this.http.post<UserModel>(USERS_URL, userBody).pipe(
      tap({
        next: (res) => {
          console.log('User created', res);
          return;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return;
        },
      })
    );
  }
  patch(user: UserInterface): Observable<UserModel> {
    const body: UserModel = {
      id: user.id,
      userTypeId: user.userTypeId,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      token: user.token,
    };

    return this.http.patch<UserModel>(USERS_URL + '/' + user.id, body).pipe(
      tap({
        next: (updatedUser) => {
          console.log('User updated', updatedUser);

          // Check if the updated user is the currently logged-in user
          const currentUser = this.getUserFromLocalStorage();
          if (currentUser?.id === updatedUser.id) {
            // Update the local storage and userSubject
            this.setUserToLocalStorage(updatedUser);
            this.userSubject.next(updatedUser);
          }
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
        },
      })
    );
  }

  delete(id: string): Observable<UserModel> {
    return this.http.delete<UserModel>(USERS_URL + id).pipe(
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
  getByID(id: string): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(USERS_URL + '/search-ID/' + id, {})
      .pipe(
        tap({
          next: (res) => {
            return;
          },
          error: (errorResponse) => {
            console.log('Error', errorResponse);
            return;
          },
        })
      );
  }
  getByEmail(id: string): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(USERS_URL + '/search-Email/' + id, {})
      .pipe(
        tap({
          next: (res) => {
            return;
          },
          error: (errorResponse) => {
            console.log('Error', errorResponse);
            return;
          },
        })
      );
  }
  login(user: LoginUserInterface): Observable<UserModel> {
    let body: LoginUserInterface = {
      email: user.email,
      password: user.password,
    };

    return this.http.post<UserModel>(USERS_URL + '/login', body).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);

          return user;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return errorResponse;
        },
      })
    );
  }
  logout() {
    this.userSubject.next(new UserModel());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
    return;
  }
}
