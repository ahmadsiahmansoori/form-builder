import { Component } from '@angular/core';
import { ApiService } from './data/services/api.service';
import { Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiservice: ApiService) {
    this.apiservice.test().subscribe(console.log)
  }
}
