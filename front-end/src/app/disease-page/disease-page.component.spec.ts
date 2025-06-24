import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasePageComponent } from './disease-page.component';

describe('DiseasePageComponent', () => {
  let component: DiseasePageComponent;
  let fixture: ComponentFixture<DiseasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseasePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiseasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
