import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentcheckingComponent } from './appointmentchecking.component';

describe('AppointmentcheckingComponent', () => {
  let component: AppointmentcheckingComponent;
  let fixture: ComponentFixture<AppointmentcheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentcheckingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentcheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
