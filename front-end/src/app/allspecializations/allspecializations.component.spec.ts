import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllspecializationsComponent } from './allspecializations.component';

describe('AllspecializationsComponent', () => {
  let component: AllspecializationsComponent;
  let fixture: ComponentFixture<AllspecializationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllspecializationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllspecializationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
