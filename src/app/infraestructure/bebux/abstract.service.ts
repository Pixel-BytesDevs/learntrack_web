import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface IGetQuery<IQuery> {
	readonly extraUrl?: string;
	readonly parameters?: IQuery;
}

export interface IDeleteQuery<IQuery> {
	readonly extraUrl?: string;
	readonly parameters?: IQuery;
}

export interface IPostQuery<DataRequest> {
	readonly extraUrl?: string;
	readonly request?: DataRequest;
}

export interface IPutQuery<DataRequest> {
	readonly extraUrl?: string;
	readonly request?: DataRequest;
}

//TODO: tiempo de espera y limite de tiempo
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

	protected delete<IResponse, IQuery>(
		data: IDeleteQuery<IQuery>,
	): Observable<IResponse> {
		const params = this.buildParams(data?.parameters || {});
		const endpoint = this.buildSafeUrl(data.extraUrl);
		return this.http.delete<IResponse>(endpoint, {
			params: params,
		});
	}

	protected post<IResponse, IRequest>(
		postData: IPostQuery<IRequest>,
	): Observable<IResponse> {
		const endpoint = this.buildSafeUrl(postData.extraUrl);
		return this.http.post<IResponse>(endpoint, postData.request);
	}

	protected put<IResponse, IRequest>(
		putData: IPutQuery<IRequest>,
	): Observable<IResponse> {
		const endpoint = this.buildSafeUrl(putData.extraUrl);

		return this.http.put<IResponse>(endpoint, putData.request);
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
		// TODO: CORREGIR POR TESSITA -> The big baby
		let url = `${this.baseUrl}/${this.prefix}`;
		if (extra != null && extra != undefined) {
			url = `${this.baseUrl}/${this.prefix}/${extra}`;
		} else {
		}

		return url;
	}
}

// HTTP CLIENT - THEORY

/*
	== Get method == 

	this.http.get<T>(url, options?);
	T => tipo de la respuesta
	url => endpoint
	options => configuración de la petición

	options => {
		headers => Sirve para enviar headers http (tokens, versiones, etc)
		params => Sirve para enviar query params
		observe => Define que quieres recibir en el Observable (body,response, events)
		responseType => Define el tipo de dato real del body (json, blob, text)
		withCredentails => Envia cookies o credenciales (cuando usas sesiones, cookies, CORS con credenciales)
		reportProgress => Sirve para trackear progreso (requiere observe: 'events')
	}

*/
