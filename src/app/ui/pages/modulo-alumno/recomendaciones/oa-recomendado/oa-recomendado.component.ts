import { Component, OnInit } from '@angular/core';
import { RecomendacionService } from '../../../../../infraestructure/services/modulo-alumno/recomendaciones/recomendacion.service';
import { TrackuiEtiquetaComponent } from '../../../../shared/trackui/trackui-etiqueta/trackui-etiqueta.component';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-oa-recomendado',
  imports: [NgFor],
  templateUrl: './oa-recomendado.component.html',
  styleUrl: './oa-recomendado.component.scss'
})
export class OaRecomendadoComponent implements OnInit{
topicName: string = '';
  description: string = '';
  recommendationText: string = '';
  currentDomain: number = 65;  // Este valor puede ser calculado o pasado desde un servicio
  competence: string = 'Ecuaciones Lineales';
  level: string = 'Básico';
  learningObjective: string = 'Resolver ecuaciones de primer grado con una variable';
  learningStyle: string = 'Optimizado para estilo visual';
  progress: number = 68;  // Este valor puede ser calculado o pasado desde un servicio
  prerequisites: string[] = ['Propiedades básicas de la igualdad', 'Operaciones con números enteros', 'Simplificación de expresiones'];

  constructor(private recomendacionService: RecomendacionService, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadRecommendationData();
  }

  loadRecommendationData(): void {
    this.recomendacionService.getRecommendation().subscribe(data => {
      this.topicName = data.topicName;
      this.description = data.description;
      this.recommendationText = data.recommendationText;
      this.currentDomain = data.currentDomain;
      this.competence = data.competence;
      this.level = data.level;
      this.learningObjective = data.learningObjective;
      this.learningStyle = data.learningStyle;
      this.progress = data.progress;
      this.prerequisites = data.prerequisites;
    });
  }

  beginLearning(){
    this.router.navigate(['aula/recomendaciones/visor-oa']);
  }
}
