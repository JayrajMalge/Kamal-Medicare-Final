import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsetupComponent } from './appoinmentsetup.component';

describe('AppoinmentsetupComponent', () => {
  let component: AppoinmentsetupComponent;
  let fixture: ComponentFixture<AppoinmentsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoinmentsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppoinmentsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
