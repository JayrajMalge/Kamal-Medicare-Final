import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseBoxComponent } from './disease-box.component';

describe('DiseaseBoxComponent', () => {
  let component: DiseaseBoxComponent;
  let fixture: ComponentFixture<DiseaseBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiseaseBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
