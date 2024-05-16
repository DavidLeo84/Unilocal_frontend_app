import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Unilocal App';
  footer = 'Universidad del Quindío - 2024-1';
}

