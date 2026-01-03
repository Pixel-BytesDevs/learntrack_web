import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IGetQuery<IQuery> {
	readonly extraUrl?: string;
	readonly parameters?: IQuery;
}

export abstract class AbstractService {
	private readonly http: HttpClient = inject(HttpClient);

	constructor(
		private readonly baseUrl: string,
		private readonly prefix = '',
	) {}

	protected get<IResponse, IQuery>(
		data: IGetQuery<IQuery>,
	): Observable<IResponse> {
		const params = this.buildParams(data?.parameters || {});
		const endpoint = this.buildSafeUrl(data.extraUrl);

		return this.http.get<IResponse>(endpoint, {
			params: params,
		});
	}

	private buildParams(query: Record<string, unknown>): Record<string, string> {
		const params: Record<string, string> = {};

		Object.keys(query).forEach((key) => {
			const value = query[key];

			if (value === null || value === undefined) {
				return;
			}

			params[key] = String(value);
		});

		return params;
	}

	private buildSafeUrl(extra: unknown): string {
        // TODO: CORREGIR POR TESSITA
		const url = `${this.baseUrl}/${this.prefix}/${extra}`;
		return url;
	}
}
