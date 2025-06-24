import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsallComponent } from './doctorsall.component';

describe('DoctorsallComponent', () => {
  let component: DoctorsallComponent;
  let fixture: ComponentFixture<DoctorsallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorsallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
