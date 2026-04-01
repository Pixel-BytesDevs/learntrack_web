import { Component } from '@angular/core';
import { ResourceService } from '../../infraestructure/services/resource/resource.service';

@Component({
	selector: 'app-admin',
	imports: [],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export class AdminComponent {
	message = '';

	constructor(private resourceService: ResourceService) {}

	ngOnInit(): void {
		this.resourceService.admin().subscribe({
			next: (data) => {
				this.message = data.message;
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
}
