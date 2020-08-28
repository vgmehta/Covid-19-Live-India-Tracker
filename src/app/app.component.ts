import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COVID19 India Tracker';
  constructor(private router: Router) {
    this.router.navigate(['/all-india']);
  }

  goToHome(): void {
    this.router.navigate(['/all-india']);
  }
}
