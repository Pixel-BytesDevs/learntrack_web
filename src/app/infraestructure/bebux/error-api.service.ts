import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface AppError {
	status: number;
	message: string;
	raw?: any;
}

@Injectable({ providedIn: 'root' })
export class ErrorApiService {
  private errorSubject = new BehaviorSubject<AppError | null>(null);
  error$ = this.errorSubject.asObservable();

  notify(error: AppError) {
    this.errorSubject.next(error);
  }
}

