import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHandlerFn,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ErrorApiService } from './error-api.service';
import { catchError, Observable, throwError } from 'rxjs';

// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {

//   constructor(private errorService: ErrorApiService) {}

//   intercept(req: HttpRequest<unknown>, next: HttpHandler) {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('HTTP Error Intercepted:', error);

//         this.errorService.notify({
//           status: error.status,
//           message: error.message,
//           raw: error
//         });

//         return throwError(() => error);
//       })
//     );
//   }
// }

// export function HttpErrorInterceptor(
// 	req: HttpRequest<unknown>,
// 	next: HttpHandlerFn,
// ): Observable<HttpEvent<unknown>> {
// 	return next(req).pipe(
// 		catchError((error: HttpErrorResponse) => {
// 			const errorService = inject(ErrorApiService);
// 			errorService.notify({
// 				status: error.status,
// 				message: error.message,
// 				raw: error,
// 			});
// 			return throwError(() => error);
// 		}),
// 	);
// }

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorApiService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.notify({
          status: error.status,
          message: error.message,
          raw: error,
        });
        return throwError(() => error);
      })
    );
  }
}

