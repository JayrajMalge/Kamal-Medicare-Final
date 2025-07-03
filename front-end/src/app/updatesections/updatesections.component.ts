import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdateaboutComponent } from '../updateabout/updateabout.component';
import { UpdatecontactComponent } from '../updatecontact/updatecontact.component';
import { UpdatePageComponent } from '../update-page/update-page.component';
import { UdatepagesectionComponent } from '../udatepagesection/udatepagesection.component';
import { FooterComponent } from "../footer/footer.component";
import { AppointmentcheckingComponent } from "../appointmentchecking/appointmentchecking.component";

@Component({
  selector: 'app-updatesections',
  standalone: true,
  imports: [FormsModule, CommonModule, UpdateaboutComponent, UpdatecontactComponent, UdatepagesectionComponent, FooterComponent, AppointmentcheckingComponent],
  templateUrl: './updatesections.component.html',
  styleUrl: './updatesections.component.css'
})
export class UpdatesectionsComponent {
  menuItems = [
    {
      name : "Check Appointments",
      isOpen: false
    }
  ];

  isSidebarOpen : boolean = false
  operation : string = 'About Information'
  updatevalue : string = ''
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleDropdown(item: any) {
    item.isOpen = !item.isOpen;
  }
  openform(operation : string){
    this.operation=operation
    console.log(operation )
  }
}
