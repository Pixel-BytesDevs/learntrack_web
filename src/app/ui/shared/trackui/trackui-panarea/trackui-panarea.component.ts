import { Component, computed, HostListener, signal } from '@angular/core';
import { PanZoomComponent, PanZoomConfigOptions } from 'ngx-panzoom';

@Component({
	selector: 'app-trackui-panarea',
	imports: [],
	templateUrl: './trackui-panarea.component.html',
	styleUrl: './trackui-panarea.component.scss',
})
export class TrackuiPanareaComponent {
	// 🔧 configuración
  minScale = 0.3;
  maxScale = 5;
  zoomSpeed = 0.0015; // 👈 controla qué tan suave es

  // 📍 estado
  scale = signal(1);
  x = signal(0);
  y = signal(0);

  private isPanning = false;
  private startX = 0;
  private startY = 0;

  transform = computed(
    () => `translate(${this.x()}px, ${this.y()}px) scale(${this.scale()})`
  );

  startPan(event: MouseEvent) {
    this.isPanning = true;
    this.startX = event.clientX - this.x();
    this.startY = event.clientY - this.y();
  }

  pan(event: MouseEvent) {
    if (!this.isPanning) return;
    this.x.set(event.clientX - this.startX);
    this.y.set(event.clientY - this.startY);
  }

  endPan() {
    this.isPanning = false;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();

    const delta = -event.deltaY * this.zoomSpeed;
    const newScale = Math.min(
      this.maxScale,
      Math.max(this.minScale, this.scale() * (1 + delta))
    );

    // 🎯 zoom hacia el cursor
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const scaleRatio = newScale / this.scale();

    this.x.set(this.x() - (mouseX - this.x()) * (scaleRatio - 1));
    this.y.set(this.y() - (mouseY - this.y()) * (scaleRatio - 1));
    this.scale.set(newScale);
  }
}
