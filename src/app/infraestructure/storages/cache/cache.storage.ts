import { Injectable } from '@angular/core';
import { IStorage } from '../storage';

@Injectable({
	providedIn: 'root',
})
export class CacheStorage implements IStorage {
	private cache: Map<string, string> = new Map<string, string>();

	save<T>(key: string, value: T): void {
		const serialized = JSON.stringify(value);
		this.cache.set(key, serialized);
	}

	get<T>(key: string): T | undefined {
		const value = this.cache.get(key);
		return value ? JSON.parse(value) : undefined;
	}

	remove(key: string) {
		this.cache.delete(key);
	}

	clear(): void {
		this.cache.clear();
	}
}
