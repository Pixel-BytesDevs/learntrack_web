import { Injectable } from '@angular/core';
import { IStorage } from '../storage';

@Injectable({ providedIn: 'root' })
export class LocalStorage implements IStorage {
	save<T>(key: string, value: T): void {
		const serialized = JSON.stringify(value);
		localStorage.setItem(key, serialized);
	}

	get<T>(key: string): T | undefined {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : undefined;
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}
}
