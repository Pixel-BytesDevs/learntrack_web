import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestCacheService } from './infraestructure/bebux/test-cache.service';
import {
	ApiService,
	CreatePostRequest,
} from './infraestructure/bebux/api.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	providers: [ApiService],
})
export class AppComponent {
	title = 'learntrack-web';

	private apiService = inject(ApiService);

	test() {
		this.apiService.getPosts();
	}

	testKill() {
		const post: CreatePostRequest = {
			userId: 1,
			title: 'Nuevo post',
			body: 'ssssssssssss',
		};
		this.apiService.createPost(post);
	}
}
