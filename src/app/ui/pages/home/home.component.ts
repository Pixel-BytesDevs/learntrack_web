import { Component } from '@angular/core';
import { AppHeaderComponent } from '../../shared/components/header/header.component';
import { NgFor } from '@angular/common';

@Component({
	selector: 'home',
	imports: [NgFor],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	features = [
		{
			icon: '🎯',
			title: 'Aprendizaje Personalizado',
			description: 'Lecciones adaptadas a tu nivel y ritmo de aprendizaje',
		},
		{
			icon: '📈',
			title: 'Seguimiento de Progreso',
			description: 'Visualiza tu avance con estadísticas detalladas',
		},
		{
			icon: '🎮',
			title: 'Ejercicios Interactivos',
			description: 'Aprende jugando con desafíos divertidos',
		},
		{
			icon: '👨‍🏫',
			title: 'Tutores Expertos',
			description: 'Acceso a profesionales cuando necesites ayuda',
		},
	];

	stats = [
		{ number: '50K+', label: 'Estudiantes Activos' },
		{ number: '1M+', label: 'Ejercicios Completados' },
		{ number: '95%', label: 'Tasa de Satisfacción' },
		{ number: '24/7', label: 'Soporte' },
	];
}
