import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreatmentComponent } from '../treatment/treatment.component';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import { AddupdateFaciliteComponent } from '../addupdate-facilite/addupdate-facilite.component';
import { AddupdateSpeacializationComponent } from '../addupdate-speacialization/addupdate-speacialization.component';
import { AddupdateNewsComponent } from '../addupdate-news/addupdate-news.component';
import { FooterComponent } from '../footer/footer.component';
import { UpdateDiseaseComponent } from "../update-disease/update-disease.component";
import { AppointmentcheckingComponent } from "../appointmentchecking/appointmentchecking.component";

@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [FormsModule, CommonModule, TreatmentComponent, AddDoctorComponent, AddupdateFaciliteComponent, AddupdateSpeacializationComponent, AddupdateNewsComponent, FooterComponent, UpdateDiseaseComponent, AppointmentcheckingComponent],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.css'
})
export class UpdatePageComponent implements OnInit{

  ngOnInit(): void {
    
  }
  isSidebarOpen : boolean = false
  operation : string = 'Add Doctor'

  menuItems = [
    {
      name: 'Add',
      subItems: [
        { name: 'Add Doctor', },
        { name: 'Add Specialization' },
        { name: 'Add Facilites' },
        { name: 'Add Treatments' },
        { name: 'Add News' },
        { name: 'Add Disease' }
      ],
      isOpen: false
    },
    {
      name: 'Update',
      subItems: [
        { name: 'Update Doctor' },
        { name: 'Update Specialization' },
        { name: 'Update Treatments' },
        { name: 'Update Facilites' },
        { name: 'Update Disease' },
      ],
      isOpen: false
    },
    {
      name: 'Delete',
      subItems: [
        { name: 'Delete Doctor' },
        { name: 'Delete Specialization' },
        { name: 'Delete Facilites' },
        { name: 'Delete Treatment' },   
        {name : 'Delete News'},
        { name: 'Delete Disease' }   
     ],
      isOpen: false
    },
    {
      name : 'Appointments',
      subItems: [
        { name: 'Check Appointments' },
     ]
    }
  ];
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleDropdown(item: any) {
    item.isOpen = !item.isOpen;
  }
  openform(operation : string){
    this.operation=operation
  }
  
}


