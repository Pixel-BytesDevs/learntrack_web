import { HttpClient } from '@angular/common/http';
import { TrackuiIcons } from '../../../../core/domain/types/tipos-icons.type';
import { TrackUiIconsDirective } from '../trackui-icons/trackui-icons.directive';
import {
	TiposButton,
	FormasButton,
	PositionsIcon,
} from './../../../../core/domain/types/tipos-button.type';
import {
	contentChild,
	Directive,
	effect,
	ElementRef,
	HostListener,
	inject,
	Injector,
	input,
	OnInit,
	Renderer2,
	ViewContainerRef,
} from '@angular/core';
import { SocialButtonStyle } from '../../../../core/domain/types/tipos-button-social.type';

interface TrackuiIconHTMLElement extends HTMLElement {
	__trackuiIconsDirectiveInstancia?: TrackUiIconsDirective;
}

@Directive({
	selector: '[trackuiSocialButton]',
})
export class TrackuiSocialButtonDirective implements OnInit {
	style = input.required<SocialButtonStyle>();
	nameLogo = input<TrackuiIcons>();
	isLoading = input<boolean>(false);

	private el = inject(ElementRef<HTMLButtonElement>);
	private renderer = inject(Renderer2);
	private trackuiDirective = contentChild(TrackUiIconsDirective);

	private logoOriginal?: TrackuiIcons;

	constructor(private injector: Injector) {
		effect(() => {
			this.handleLoading();
		});
	}

	ngOnInit(): void {
		this.renderer.addClass(this.el.nativeElement, 'trackui-social-button');
		if (this.style() === 'black') {
			
			this.renderer.addClass(
				this.el.nativeElement,
				`trackui-social-button-${this.style()}`,
			);
			this.verificarIcon();
		} else {
			this.renderer.addClass(
				this.el.nativeElement,
				`trackui-social-button-${this.style()}`,
			);
			const logo = this.nameLogo();
			if (logo) this.setLogo('left', logo);
		}
	}

	handleLoading() {
		if (!this.isLoading()) {
			const iconDirective = this.getIconDirective();
			// Restaurar icono original
			if (!iconDirective) return;

			if (this.logoOriginal) {
				iconDirective.nombre = this.logoOriginal;
			}

			// Accede al elemento nativo (DOM)
			const btn = this.el.nativeElement;
			const iconEl = btn.querySelector('[trackuiIcon]');

			if (iconEl) {
				this.renderer.removeClass(iconEl, 'icon-loader');
			}
		} else {
			const iconDirective = this.getIconDirective();
			if (!iconDirective) return;

			// Guarda icono original
			if (!this.logoOriginal) {
				this.logoOriginal = iconDirective.nombre;
			}

			// Cambia a loader
			iconDirective.nombre = 'loader';

			// Accede al elemento nativo (DOM)
			const btn = this.el.nativeElement;
			const iconEl = btn.querySelector('[trackuiIcon]');

			if (iconEl) {
				this.renderer.addClass(iconEl, 'icon-loader');
			}
		}
	}

	private getIconDirective(): TrackUiIconsDirective | undefined {
		// 1. Se intenta acceder via @ContentChild
		const dir = this.trackuiDirective();
		if (dir) return dir;

		// 2. Si no se encontro, se busca en el DOM
		const btn = this.el.nativeElement;
		const iconEl = btn.querySelector('[trackuiIcon]') as TrackuiIconHTMLElement;
		if (iconEl?.__trackuiIconsDirectiveInstancia) {
			return iconEl.__trackuiIconsDirectiveInstancia;
		}

		return undefined;
	}

	public verificarIcon(): void {
		const nombreLogo = this.nameLogo();

		if (nombreLogo != undefined) {
			this.setLogo('left', nombreLogo);
		}
	}

	public setLogo(position: PositionsIcon, logoName: TrackuiIcons): void {
		const btn = this.el.nativeElement as HTMLButtonElement;

		const existingDirIcon = btn.querySelector('[trackuiIcon]');

		if (existingDirIcon) {
			if (this.trackuiDirective()) {
				const iconDirective = this.getIconDirective();
				if (iconDirective) iconDirective.nombre = logoName;
			}
		} else {
			const span = this.renderer.createElement('span');
			this.renderer.setAttribute(span, 'trackuiIcon', '');
			this.renderer.setStyle(span, 'font-size', '20px');
			this.renderer.insertBefore(btn, span, btn.firstChild);
			this.agregarDirectivaIcono(span, logoName);
		}
	}

	public agregarDirectivaIcono(er: HTMLElement, icon: TrackuiIcons): void {
		const httpClient = this.injector.get(HttpClient);
		const render = this.injector.get(Renderer2);
		const directivaInstancia = new TrackUiIconsDirective(
			new ElementRef(er),
			httpClient,
			render,
		);

		directivaInstancia.nombre = icon;

		if (typeof directivaInstancia.ngOnInit === 'function') {
			directivaInstancia.ngOnInit();
		}

		(er as TrackuiIconHTMLElement).__trackuiIconsDirectiveInstancia =
			directivaInstancia;
	}

	private removeIconsDirective(element: HTMLElement): void {
		// Limpia la referencia para evitar fugas de memoria
		delete (element as TrackuiIconHTMLElement).__trackuiIconsDirectiveInstancia;
	}
}
