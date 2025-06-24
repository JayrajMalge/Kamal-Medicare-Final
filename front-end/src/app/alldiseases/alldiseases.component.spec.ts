import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldiseasesComponent } from './alldiseases.component';

describe('AlldiseasesComponent', () => {
  let component: AlldiseasesComponent;
  let fixture: ComponentFixture<AlldiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlldiseasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlldiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
