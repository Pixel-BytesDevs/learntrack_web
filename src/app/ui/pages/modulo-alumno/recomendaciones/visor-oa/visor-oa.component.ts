import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OAResource, OAViewerData } from '../../../../../core/domain/interfaces/gestor-oa/oa-resource.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OaViewerService } from '../../../../../infraestructure/services/modulo-alumno/oa-viewer/oa-viewer.service';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-visor-oa',
  imports: [NgIf, NgFor,CommonModule],
  templateUrl: './visor-oa.component.html',
  styleUrl: './visor-oa.component.scss'
})
export class VisorOaComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('pdfViewer') pdfViewer!: ElementRef<HTMLEmbedElement>;

  oaData: OAViewerData | null = null;
  loading = true;
  error: string | null = null;
  currentResourceUrl: string | null = null;
  activeTab: 'main' | 'complementary' = 'main';
  selectedResource: OAResource | null = null;
  videoProgress = 0;
  videoDuration = 0;
  isPlaying = false;
  currentTime = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oaViewerService: OaViewerService
  ) { }

  ngOnInit(): void {
    this.loadOAData();
  }

  ngOnDestroy(): void {
    // Limpiar recursos
    if (this.currentResourceUrl) {
      URL.revokeObjectURL(this.currentResourceUrl);
    }
  }

  loadOAData(): void {
    this.loading = true;
    const oaId = this.route.snapshot.params['id'] || 1; // Obtener ID de la ruta o usar default

    this.oaViewerService.getOAViewerData(oaId).subscribe({
      next: (data) => {
        this.oaData = data;
        this.selectedResource = data.mainResource;
        this.loadResource(this.selectedResource);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el objeto de aprendizaje';
        this.loading = false;
        console.error('Error loading OA data:', err);
      }
    });
  }

  loadResource(resource: OAResource): void {
    this.selectedResource = resource;
    
    // Simular carga de URL (en producción usarías el servicio real)
    this.oaViewerService.getResourceUrl(resource.id).subscribe({
      next: (response) => {
        this.currentResourceUrl = response.url;
      },
      error: (err) => {
        console.error('Error loading resource URL:', err);
        // En caso de error, mostrar mensaje o recurso alternativo
      }
    });
  }

  getResourceTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      video: '🎬',
      pdf: '📄',
      image: '🖼️',
      exercise: '💪',
      link: '🔗',
      reading: '📖',
      summary: '📋'
    };
    return icons[type] || '📚';
  }

  getResourceTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      video: 'tw-bg-purple-100 tw-text-purple-800',
      pdf: 'tw-bg-red-100 tw-text-red-800',
      image: 'tw-bg-green-100 tw-text-green-800',
      exercise: 'tw-bg-orange-100 tw-text-orange-800',
      link: 'tw-bg-blue-100 tw-text-blue-800',
      reading: 'tw-bg-indigo-100 tw-text-indigo-800',
      summary: 'tw-bg-teal-100 tw-text-teal-800'
    };
    return colors[type] || 'tw-bg-gray-100 tw-text-gray-800';
  }

  // Métodos para control de video
  togglePlay(): void {
    if (this.videoPlayer) {
      if (this.isPlaying) {
        this.videoPlayer.nativeElement.pause();
      } else {
        this.videoPlayer.nativeElement.play();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  onTimeUpdate(): void {
    if (this.videoPlayer) {
      this.currentTime = this.videoPlayer.nativeElement.currentTime;
      this.videoDuration = this.videoPlayer.nativeElement.duration;
      this.videoProgress = (this.currentTime / this.videoDuration) * 100;
    }
  }

  seekTo(percentage: number): void {
    if (this.videoPlayer && this.videoDuration) {
      this.videoPlayer.nativeElement.currentTime = (percentage / 100) * this.videoDuration;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  markAsCompleted(): void {
    if (this.oaData) {
      this.oaViewerService.updateProgress(this.oaData.mainResource.id, 100).subscribe({
        next: () => {
          // Opcional: mostrar mensaje de éxito o redirigir
          alert('¡Objeto de aprendizaje completado!');
        },
        error: (err) => {
          console.error('Error marking as completed:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/aula/recomendaciones']);
  }
}
