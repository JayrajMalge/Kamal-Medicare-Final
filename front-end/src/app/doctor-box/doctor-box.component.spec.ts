import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBoxComponent } from './doctor-box.component';

describe('DoctorBoxComponent', () => {
  let component: DoctorBoxComponent;
  let fixture: ComponentFixture<DoctorBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
