import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateFaciliteComponent } from './addupdate-facilite.component';

describe('AddupdateFaciliteComponent', () => {
  let component: AddupdateFaciliteComponent;
  let fixture: ComponentFixture<AddupdateFaciliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddupdateFaciliteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddupdateFaciliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
