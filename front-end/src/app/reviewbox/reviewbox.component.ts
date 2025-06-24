import { Component, Input } from '@angular/core';
import { Review } from '../enities';

@Component({
  selector: 'app-reviewbox',
  standalone: true,
  imports: [],
  templateUrl: './reviewbox.component.html',
  styleUrl: './reviewbox.component.css'
})
export class ReviewboxComponent {
  @Input() review : Review = new Review()
}
