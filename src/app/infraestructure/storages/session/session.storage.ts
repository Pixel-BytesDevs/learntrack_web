import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorage {
	save(key: string, value: any) {
		sessionStorage.setItem(key, value);
	}

	get(key: string): any {
		const value = sessionStorage.getItem(key);
		if (value != null) {
			return value;
		}
		return '';
	}

	remove(key: string) {
		sessionStorage.removeItem(key);
	}
}
