import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SessionStorage } from '../../../../infraestructure/storages/session/session.storage';
import { KEYS_STORAGE } from '../../../../core/domain/constants/key-local-storage.const';
import { TrackuiDropdown } from '../../../shared/trackui/trackui-dropdown/trackui-dropdown.directive';
import { TrackuiDropdownMenuComponent } from '../../../shared/trackui/trackui-dropdown/trackui-dropdown-menu/trackui-dropdown-menu.component';
import { TrackUiIconsDirective } from '../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { TrackuiMenuItemDirective } from "../../../shared/trackui/trackui-dropdown/trackui-menu-item/trackui-menu-item.directive";
import { AppHeaderComponent } from '../../../shared/components/header/header.component';

@Component({
	selector: 'cuestionario',
	imports: [AppHeaderComponent, RouterOutlet],
	templateUrl: './cuestionario.component.html',
	styleUrl: './cuestionario.component.scss',
})
export class CuestionarioComponent implements OnInit {
	isOpen = false; // Estado del dropdown del usuario
	isProgressVisible = true; // Barra de progreso visible
	progress = 0;

	constructor(
		private router: Router,
		private storageSesion: SessionStorage,
	) {}

	ngOnInit(): void {
		var progressInSession = this.storageSesion.get(
			KEYS_STORAGE.progresoGeneral,
		);
		if (progressInSession) {
			//this.progress = progressInSession;
		}

		this.router.events.subscribe((event) => {
			if (this.router.url.includes('cuestionario-nivel')) {
				this.updateProgress(50);
			} else {
				this.updateProgress(0);
			}
		});
	}

	updateProgress(progress: number): void {
		this.progress = progress;
		this.storageSesion.save(KEYS_STORAGE.progresoGeneral, progress);
	}

	openDropdown(){
		this.isOpen = !this.isOpen;
	}
}
