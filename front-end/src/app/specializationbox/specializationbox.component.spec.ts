import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationboxComponent } from './specializationbox.component';

describe('SpecializationboxComponent', () => {
  let component: SpecializationboxComponent;
  let fixture: ComponentFixture<SpecializationboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecializationboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
