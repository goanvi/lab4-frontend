import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {IUser} from "../models/user";
import {catchError, Observable, tap, throwError} from "rxjs";
import {ErrorService} from "./error.service";
import * as assert from "assert";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string|null =''
  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.token = localStorage.getItem('token')
  }

  authenticated: boolean = false

  signIn(user: IUser): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(user.login + ':' + user.password),
    })
    return this.http.get<string>('http://localhost:8001/api/security/login', {headers: headers})
      .pipe(
        tap(response => {
          // @ts-ignore
          localStorage.setItem('token', response['token'])
          // @ts-ignore
          this.token = response['token']
          this.authenticated = true
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  signUp(user: IUser): Observable<string> {
    return this.http.post<string>('http://localhost:8001/api/security/register', {
      login: user.login,
      password: user.password
    })
      .pipe(
        tap(response => {
          // @ts-ignore
          localStorage.setItem('token', response['token'])
          // @ts-ignore
          this.token = response['token']
          this.authenticated = true
        }),
        catchError(this.errorHandler.bind(this))
      )
  }

  logout(){
    localStorage.removeItem('token')
    this.token = ''
  }

  private errorHandler(error: HttpErrorResponse) {
    this.authenticated = false
    if (error.url === 'http://localhost:8001/api/security/login') {
      if (error.status === 401) {
        this.errorService.handle('Incorrect username or password.')
      } else {
        this.errorService.handle('Server error')
      }
    } else if (error.url === 'http://localhost:8001/api/security/register') {
      if (error.status === 400) {
        this.errorService.handle('User already exist.')
      } else {
        this.errorService.handle('Server error')
      }
    }
    return throwError(() => error.message)
  }
}
