import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITEMS_SIDEBAR_TEST } from '../../../../core/domain/constants/items-sidebar-test.const';
import { OPCIONES_BREADCRUMB_TEST } from '../../../../core/domain/constants/opciones-breadcrumb-test.const';
import { OPCIONES_SEGMENT_TEST } from '../../../../core/domain/constants/opciones-control-segment.const';
import { OPCIONES_TABMENU_TEST } from '../../../../core/domain/constants/opciones-tabmenu-test.const';
import { UNIDADES_ACCORDION_TEST } from '../../../../core/domain/constants/unidades-accordion-test.const';
import { TiposButton } from '../../../../core/domain/types/tipos-button.type';
import { TiposEtiqueta } from '../../../../core/domain/types/tipos-etiqueta.type';
import { ExpansionPanelContentComponent } from '../../../shared/trackui/trackui-accordion/expansion-panel-content/expansion-panel-content.component';
import { ExpansionPanelHeaderComponent } from '../../../shared/trackui/trackui-accordion/expansion-panel-header/expansion-panel-header.component';
import { ExpansionPanelComponent } from '../../../shared/trackui/trackui-accordion/expansion-panel/expansion-panel.component';
import { PanelDescriptionComponent } from '../../../shared/trackui/trackui-accordion/panel-description/panel-description.component';
import { PanelItemComponent } from '../../../shared/trackui/trackui-accordion/panel-item/panel-item.component';
import { PanelTitleComponent } from '../../../shared/trackui/trackui-accordion/panel-title/panel-title.component';
import { TrackuiAccordionComponent } from '../../../shared/trackui/trackui-accordion/trackui-accordion.component';
import { TrackuiAlertaComponent } from '../../../shared/trackui/trackui-alerta/trackui-alerta.component';
import { TrackuiBreadcrumbComponent } from '../../../shared/trackui/trackui-breadcrumb/trackui-breadcrumb.component';
import { TrackuiButtonDirective } from '../../../shared/trackui/trackui-button/trackui-button.directive';
import { TrackuiCardEtiquetaComponent } from '../../../shared/trackui/trackui-card-etiqueta/trackui-card-etiqueta.component';
import { TrackuiCheckboxComponent } from '../../../shared/trackui/trackui-checkbox/trackui-checkbox.component';
import { TrackuiControlSegmentComponent } from '../../../shared/trackui/trackui-control-segment/trackui-control-segment.component';
import { TrackuiDividerComponent } from '../../../shared/trackui/trackui-divider/trackui-divider.component';
import { TrackuiDropdownMenuComponent } from '../../../shared/trackui/trackui-dropdown/trackui-dropdown-menu/trackui-dropdown-menu.component';
import { TrackuiDropdown } from '../../../shared/trackui/trackui-dropdown/trackui-dropdown.directive';
import { TrackuiMenuItemDirective } from '../../../shared/trackui/trackui-dropdown/trackui-menu-item/trackui-menu-item.directive';
import { TrackuiEtiquetaComponent } from '../../../shared/trackui/trackui-etiqueta/trackui-etiqueta.component';
import { TrackUiIconsDirective } from '../../../shared/trackui/trackui-icons/trackui-icons.directive';
import { TrackuiInputComponent } from '../../../shared/trackui/trackui-input/trackui-input.component';
import { TrackuiModalComponent } from '../../../shared/trackui/trackui-modal/trackui-modal.component';
import { TrackuiOptionSelectComponent } from '../../../shared/trackui/trackui-select/trackui-option-select/trackui-option-select.component';
import { TrackuiSelectComponent } from '../../../shared/trackui/trackui-select/trackui-select.component';
import { TrackuiSidebarComponent } from '../../../shared/trackui/trackui-sidebar/trackui-sidebar.component';
import { ItemStepComponent } from '../../../shared/trackui/trackui-ste/item-ste/item-ste.component';
import { TrackuiStepComponent } from '../../../shared/trackui/trackui-ste/trackui-ste.component';
import { TrackuiTabMenuComponent } from '../../../shared/trackui/trackui-tab-menu/trackui-tab-menu.component';
import { TrackuiTextareaComponent } from '../../../shared/trackui/trackui-textarea/trackui-textarea.component';
import { TrackuiToggleButton } from '../../../shared/trackui/trackui-toggle-button/trackui-toggle-button.component';
import { TrackuiUploadButtonComponent } from '../../../shared/trackui/trackui-upload-button/trackui-upload-button.component';
import { TrackuiUploadComponent } from '../../../shared/trackui/trackui-upload/trackui-upload.component';
import { ITEMS_SIDEBAR_COURSE_TEST } from './../../../../core/domain/constants/items-sidebar-test.const';
import { TiposAlerta } from './../../../../core/domain/types/tipos-alerta.type';
import { SeccionComponent } from './components/seccion-component/seccion.component';

import { FormsModule } from '@angular/forms';
@Component({
	selector: 'playground',
	imports: [
		SeccionComponent,
		TrackuiToggleButton,
		TrackuiEtiquetaComponent,
		TrackuiAlertaComponent,
		NgFor,
		ReactiveFormsModule,
		TrackUiIconsDirective,
		TrackuiCardEtiquetaComponent,
		TrackuiInputComponent,
		TrackuiTabMenuComponent,
		TrackuiDropdown,
		TrackuiDropdownMenuComponent,
		TrackuiMenuItemDirective,
		TrackuiButtonDirective,
		TrackuiBreadcrumbComponent,
		TrackuiCheckboxComponent,
		TrackuiOptionSelectComponent,
		TrackuiSelectComponent,
		TrackuiControlSegmentComponent,
		TrackuiAccordionComponent,
		ExpansionPanelComponent,
		PanelDescriptionComponent,
		
		PanelTitleComponent,
		ExpansionPanelHeaderComponent,
		PanelItemComponent,
		ExpansionPanelContentComponent,
		TrackuiDividerComponent,
		TrackuiUploadComponent,
		TrackuiUploadButtonComponent,
		TrackuiTextareaComponent,
		TrackuiSidebarComponent,
		TrackuiModalComponent,
		TrackuiStepComponent,
		ItemStepComponent,
		NgIf,
		FormsModule,
		
	],
	templateUrl: 'playground.component.html',
	styleUrl: 'playground.component.scss',
})
export class PlayGroundPage {
	constructor() {
		this.controlSegmentado.valueChanges.subscribe((valor) => {
			console.log('✅ Objeto recibido en el Playground:', valor);
		});
	}

	isSidebarOpen = false;
	sidebarItems = [
		{ label: 'Inicio', ruta: '/playground', icon: 'home' },
		{ label: 'Cursos', ruta: '/courses', icon: 'school' },
		{ label: 'Perfil', ruta: '/profile', icon: 'person' },
	];

	// Método para abrir/cerrar el sidebar
	toggleSidebar() {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	closeSidebar() {
    this.isSidebarOpen = false;
  }

	tiposEtiquetas: TiposEtiqueta[] = [
		'primary',
		'secondary',
		'tertiary',
		'cuaternary',
		'quinary',
		'neutral',
		'subordinary',
		'warning',
		'success',
		'danger',
	];

	TiposAlerta: TiposAlerta[] = [
		'success',
		'danger',
		'warning',
		'neutral',
		'primary',
		'secondary',
		'tertiary',
		'cuaternary',
	];

	isModalOpen = false;

	readonly opciones = OPCIONES_TABMENU_TEST;
	readonly opcionesBreadcrumb = OPCIONES_BREADCRUMB_TEST;
	readonly opcionesControlSegment = OPCIONES_SEGMENT_TEST;
	readonly unidadesAccordion = UNIDADES_ACCORDION_TEST;
	readonly itemsSidebar = ITEMS_SIDEBAR_TEST;
	readonly itemsSidebarCourse = ITEMS_SIDEBAR_COURSE_TEST;

	tiposButtonNormal: TiposButton[] = [
		'primary',
		'secondary',
		'tertiary',
		'cuaternary',
		'quinary',
		'outlined',
		'texto',
		'link',
	];

	tiposButtonCircular: TiposButton[] = [
		'primary',
		'secondary',
		'tertiary',
		'cuaternary',
		'quinary',
		'outlined',
	];

	controlToggle = new FormControl<boolean>(true);
	controlCheckbox = new FormControl<boolean>(false);
	controlInput = new FormControl<string>('', [Validators.minLength(3)]);
	controlSelect = new FormControl<string | number | null | undefined>(
		undefined,
	);

	controlSegmentado = new FormControl<number | string | undefined>(1);

	itemAccordionSeleccionado = 0;
	UnidadAccordionSeleccionado = 1;

	isloading = false;
	ejecutar() {
		this.isloading = true;
		setTimeout(() => {
			this.isloading = false;
			console.log('MELANI ES BEBE');
		}, 2000);
	}

	ejecutarConElOutput(itemId: number) {
		this.itemAccordionSeleccionado = itemId;
		console.log(
			`Id del Item seleccionado pe: ${this.itemAccordionSeleccionado}`,
		);
	}

	unidadSeleccionadaRecibida(unidadId: number) {
		if (this.UnidadAccordionSeleccionado === unidadId) {
			this.UnidadAccordionSeleccionado = 0;
		} else {
			this.UnidadAccordionSeleccionado = unidadId;
		}
		console.log(
			`Id de unidad seleccionado pe: ${this.UnidadAccordionSeleccionado}`,
		);
	}

	abrirSider() {
		this.isSidebarOpen = true;
	}

	cerrarSider = () => {
		this.isSidebarOpen = false;
	};

	abrirModal() {
		this.isModalOpen = true;
	}

	cerrarModal = () => {
		this.isModalOpen = false;
	};

	fileUploaded = false;
	acceptedTerms = false;

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.fileUploaded = true;
		}
	}

	onFinalizado() {
		alert('🎉 Todos los pasos completados');
	}
}
