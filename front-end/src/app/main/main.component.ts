import { Component, OnInit,Inject, PLATFORM_ID  } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AppoinmentsetupComponent } from '../appoinmentsetup/appoinmentsetup.component';
import { SpecializationboxComponent } from '../specializationbox/specializationbox.component';
import { DoctorsboxComponent } from '../doctorsbox/doctorsbox.component';
import { BlogsNewsComponent } from '../blogs-news/blogs-news.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, AppoinmentsetupComponent, SpecializationboxComponent, DoctorsboxComponent, BlogsNewsComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
   loginstatus : boolean = false
   ngOnInit(): void {
    const email = window.localStorage.getItem("email") ?? '';
    if (email != null && email != '') {
      this.loginstatus = true;
    }
   }
}
