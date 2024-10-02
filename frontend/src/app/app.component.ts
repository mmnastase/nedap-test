import { Component } from '@angular/core';
import { GnomeListComponent } from './gnomes/gnome-list/gnome-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GnomeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
