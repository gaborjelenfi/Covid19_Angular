import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError,  } from "rxjs/operators";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError(error => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        console.log('this is client side error');
        errorMsg = `Error: ${error.error.message}`;
      }
      else {
        console.log('this is server side error');
        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
      }
      console.error(errorMsg);
      return throwError(errorMsg);
    }));

  }
}
