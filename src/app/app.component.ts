
import { TestCacheService } from './infraestructure/bebux/test-cache.service';
import {
	ApiService,
	CreatePostRequest,
} from './infraestructure/bebux/api.service';
import { TrackuiMessageComponent } from './ui/shared/trackui/trackui-message/trackui-message.component';
import { TrackuiLoadingComponent } from './ui/shared/trackui/trackui-loading/trackui-loading.component';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import { AppHeaderComponent } from "./ui/shared/components/header/header.component";

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
