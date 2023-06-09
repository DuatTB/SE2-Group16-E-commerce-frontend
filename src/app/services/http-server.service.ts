import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpServerService {
  private REST_URL = 'https://localhost:8243/api/v0';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    const url = `${this.REST_URL}/product/viewList`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError))
  }
  getProductById(id: any): Observable<any> {
    const url = `${this.REST_URL}/product/detail/${id}`;
    return this.http
      .get<any>(url)
      .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
