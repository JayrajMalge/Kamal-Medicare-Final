import { CommonModule } from '@angular/common';
import { Component ,EventEmitter,Input,Output} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-image',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent {

  @Input() isOpen: boolean = false;
  @Input() images: string[] = [];
  @Output() close = new EventEmitter<void>();
  currentImageIndex: number = 0;

  nextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.images.length) %
      this.images.length;
  }

  closeDialog() {
    this.isOpen = false;
    this.close.emit();
  }
}
