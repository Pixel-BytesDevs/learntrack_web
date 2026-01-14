import { Observable, of, tap } from 'rxjs';
import {
	AbstractService,
	IDeleteQuery,
	IGetQuery,
	IPostQuery,
	IPutQuery,
} from './abstract.service';
import { inject } from '@angular/core';
import { CacheStorageProvider } from '../providers/cache-storage.provider';

export interface TestCache<T> {
	type: string;
	id: number | string;
	data: T[];
}

export abstract class TestCacheService extends AbstractService {
	private cacheStorageProvider = inject(CacheStorageProvider);

	constructor(baseUrl: string, prefix: string = '') {
		super(baseUrl, prefix);
	}

	protected getCache<IResponse, IQuery>(
		data: IGetQuery<IQuery>,
		key: string,
	): Observable<IResponse> {
		const cached = this.cacheStorageProvider.getData<IResponse>(key);

		if (cached) {
			return of(cached);
		}

		return this.get<IResponse, IQuery>(data).pipe(
			tap((response) => {
				this.cacheStorageProvider.saveData(key, response);
			}),
		);
	}

	protected postCache<IResponse, IRequest>(
		data: IPostQuery<IRequest>,
		keyToKill: string,
	): Observable<IResponse> {
		return this.post<IResponse, IRequest>(data).pipe(
			tap((response) => {
				this.cacheStorageProvider.removeData(keyToKill);
			}),
		);
	}

	protected putCache<IResponse, IRequest>(
		data: IPutQuery<IRequest>,
		keyToKill: string,
	): Observable<IResponse> {
		return this.put<IResponse, IRequest>(data).pipe(
			tap((response) => {
				this.cacheStorageProvider.removeData(keyToKill);
			}),
		);
	}
	protected deleteCache<IResponse, IQuery>(
		data: IDeleteQuery<IQuery>,
		keyToKill: string,
	): Observable<IResponse> {
		return this.delete<IResponse, IQuery>(data).pipe(
			tap((response) => {
				this.cacheStorageProvider.removeData(keyToKill);
			}),
		);
	}
}
