import { inject, Injectable } from '@angular/core';
import { CacheStorage } from '../storages/cache/cache.storage';

@Injectable({ providedIn: 'root' })
export class CacheStorageProvider {
	private cacheStorage = inject(CacheStorage);

	saveData<T>(key: string, data: T): void {
		if (data === null || data === undefined) return;
		this.cacheStorage.save<T>(key, data);
	}

	getData<T>(key: string): T | undefined {
		if (!this.cacheStorage.get(key)) return undefined;

		return this.cacheStorage.get<T>(key);
	}

	removeData(key: string) {
		this.cacheStorage.remove(key);
	}
}
