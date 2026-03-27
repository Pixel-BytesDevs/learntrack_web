import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorized',
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.scss'
})
export class AuthorizedComponent implements OnInit{

  code = '';

  constructor(private activatedRoute: ActivatedRoute){
    
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.code = data['code'];
      console.log('Code recibido:', this.code);
    })
    
  }

}
