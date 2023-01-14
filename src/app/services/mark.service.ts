import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {IMark} from "../models/mark";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MarkService{


  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }


  getPage(page: number, sizeOfPage: number):Observable<IMark[]>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    })
    return this.http.get<IMark[]>('http://localhost:8001/api/mark/page?page=' + page + '&size=' + sizeOfPage,{headers: headers})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  countMarks():Observable<number>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    })
    return this.http.get<number>('http://localhost:8001/api/mark/count',{headers:headers})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  addMark(mark: IMark): Observable<IMark> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    })
    return this.http.post<IMark>('http://localhost:8001/api/mark', mark, {headers: headers})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  deleteAll():Observable<number>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authService.token
    })
    return this.http.delete<number>('http://localhost:8001/api/mark',{headers:headers})
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigateByUrl('/login')
      localStorage.removeItem('token')
    }
    return throwError(() => error.message)
  }

}
