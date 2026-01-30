import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-auth-layout',
	imports: [RouterOutlet],
	templateUrl: './auth-layout.component.html',
	styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
	private router = inject(Router);

	title = 'Iniciar Sesión';

	constructor() {
		this.router.events
			.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
			.subscribe((event) => {
				this.updateTitle(this.router.url);
			});
      this.updateTitle(this.router.url);
	}

	private updateTitle(url: string): void {
		if (url.includes('register')) {
			this.title = 'Regístrate';
		} else {
			this.title = 'Iniciar Sesión';
		}
	}
}
