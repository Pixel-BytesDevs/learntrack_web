import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../infraestructure/services/auth/auth.service';
import { TokenService } from '../../infraestructure/services/token/token.service';

@Component({
	selector: 'app-authorized',
	imports: [],
	templateUrl: './authorized.component.html',
	styleUrl: './authorized.component.scss',
})
export class AuthorizedComponent implements OnInit {
	code = '';

	constructor(
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
    private tokenService: TokenService
	) {}
	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe((data) => {
			this.code = data['code'];
			this.getToken();
		});
	}

	getToken(): void {
		this.authService.getToken(this.code).subscribe(
			(data) => {
        this.tokenService.setTokens(data.access_token,data.refresh_token);
      },
			(err) => {
				console.log(err);
			},
		);
	}
}
