import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityBoxComponent } from './facility-box.component';

describe('FacilityBoxComponent', () => {
  let component: FacilityBoxComponent;
  let fixture: ComponentFixture<FacilityBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
