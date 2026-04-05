import { Component } from '@angular/core';
import { AppHeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'home',
  imports: [AppHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
