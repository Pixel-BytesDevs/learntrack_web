import { Injectable } from '@angular/core';

export interface TestCache<T> {
	type: string;
	id: number | string;
    data: T[];
}

// root -> unica instancia en todo el sistema
// sino se creara uno nuevo
@Injectable({ providedIn: 'root' })
export class TestCacheService {
    
}
