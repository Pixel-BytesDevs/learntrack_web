import { inject } from '@angular/core';
import { Services } from '../../../environments/services/services.dev';
import { HttpClient } from '@angular/common/http';

export abstract class BaseApiService {
	protected readonly http: HttpClient = inject(HttpClient);

	constructor(
		protected readonly base: string,
		protected readonly prefix: string = '',
	) {}


    protected get<Response, Query>({}) {
        
    }
}
