import { Injectable } from '@angular/core';
import { TestCacheService } from './test-cache.service';

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface CreatePostRequest {
	userId: number;
	title: string;
	body: string;
}

@Injectable()
export class ApiService extends TestCacheService {
	constructor() {
		super('https://jsonplaceholder.typicode.com', 'posts');
	}

	getPosts() {
		this.getCache<Post[], null>({}, 'POSTS_DATA').subscribe((response) =>
			console.log(response),
		);
	}

	createPost(post: CreatePostRequest) {
		this.postCache<Post, CreatePostRequest>(
			{
				request: post,
			},
			'POSTS_DATA',
		).subscribe((response) => console.log(response));
	}
}
