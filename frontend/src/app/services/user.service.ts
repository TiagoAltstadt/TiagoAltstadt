import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { USERS_URL } from '../shared/constants/urls';
import { UserModel } from '../shared/models/User';
import { UserInterface } from '../shared/interfaces/userInterfce';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
  put(user: UserInterface): Observable<UserModel> {
    let body: UserModel = {
      id: user.id,
      userTypeId: user.userTypeId,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };

    return this.http.put<UserModel>(USERS_URL + user.id, body).pipe(
      tap({
        next: (res) => {
          console.log('User updated', res);
          return;
        },
        error: (errorResponse) => {
          console.log('Error', errorResponse);
          return;
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
  searchById(id: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(USERS_URL + id, {}).pipe(
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
