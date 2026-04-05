import { Component, inject, input, OnInit, signal } from '@angular/core';
import { OPCIONES_HEADER } from '../../../../core/domain/constants/opciones-header.const';
import { HeaderOpcion } from '../../../../core/domain/interfaces/header-opcion.interface';
import { TrackuiButtonDirective } from '../../trackui/trackui-button/trackui-button.directive';
import { TrackUiIconsDirective } from '../../trackui/trackui-icons/trackui-icons.directive';
import { OpcionHeaderComponent } from './components/opcion-header/opcion-header.component';
import { TieneAccesoDirective } from '../../directiva/tiene-acceso.directive';
import { TokenService } from '../../../../infraestructure/services/token/token.service';
import { Router, RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-header',
	imports: [
		TrackUiIconsDirective,
		NgClass,
    RouterModule
		
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	animations: [
    trigger('fadeInScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-5px) scale(0.98)' }),
        animate('150ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('120ms ease-in', style({ opacity: 0, transform: 'translateY(-5px) scale(0.98)' })),
      ]),
    ]),
  ],
})
export class AppHeaderComponent {
  private tokenService = inject(TokenService);
  private router = inject(Router);
 
  // Solo el CuestionarioComponent los pasa
  showProgress = input<boolean>(false);
  progress = input<number>(0);
 
  isOpen = false;
 
  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  get name(): string {
    return this.tokenService.getName();
  }
 
  get username(): string {
    return this.tokenService.getUsername();
  }
 
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
 
  logout(): void {
    this.tokenService.clearTokens();
    this.isOpen = false;
    this.router.navigate(['/']);
  }
}
