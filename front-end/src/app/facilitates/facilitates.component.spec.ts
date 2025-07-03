import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitatesComponent } from './facilitates.component';

describe('FacilitatesComponent', () => {
  let component: FacilitatesComponent;
  let fixture: ComponentFixture<FacilitatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilitatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
