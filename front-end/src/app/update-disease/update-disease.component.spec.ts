import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiseaseComponent } from './update-disease.component';

describe('UpdateDiseaseComponent', () => {
  let component: UpdateDiseaseComponent;
  let fixture: ComponentFixture<UpdateDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDiseaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
