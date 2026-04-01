import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../infraestructure/services/resource/resource.service';

@Component({
	selector: 'app-user',
	imports: [],
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
	message = '';

	constructor(private resourceService: ResourceService) {}

	ngOnInit(): void {
		this.resourceService.user().subscribe(
			(data) => {
				this.message = data.message;
			},
			(err) => {
				console.log('Hay errorrr');
				console.log(err);
			},
		);
	}
}
