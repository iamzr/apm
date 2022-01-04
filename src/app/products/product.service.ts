import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IProduct } from './product';
import {tap, catchError} from "rxjs/operators"


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private productUrl = "api/products/products.json"


  constructor(private http:HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log("all", JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  handleError(handleError: HttpErrorResponse) {
    let errorMessage = "";

    if (handleError.error instanceof ErrorEvent) {
      errorMessage = `An error occored ${handleError.error.message}`
    } else {
      errorMessage = `Server returned code: ${handleError.status}`
    }

    console.error(errorMessage)
    return throwError(errorMessage)

  }
}
