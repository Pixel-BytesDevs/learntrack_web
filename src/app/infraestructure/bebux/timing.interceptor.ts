import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(private loadingService: LoadingService) {}

	intercept(req: HttpRequest<unknown>, next: HttpHandler) {
		this.loadingService.show();

		return next.handle(req).pipe(
			finalize(() => {
				this.loadingService.hide();
			}),
		);
	}
}
