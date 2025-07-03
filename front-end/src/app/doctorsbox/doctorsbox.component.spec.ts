import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsboxComponent } from './doctorsbox.component';

describe('DoctorsboxComponent', () => {
  let component: DoctorsboxComponent;
  let fixture: ComponentFixture<DoctorsboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorsboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
