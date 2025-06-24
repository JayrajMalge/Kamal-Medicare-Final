import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubspecializationComponent } from './subspecialization.component';

describe('SubspecializationComponent', () => {
  let component: SubspecializationComponent;
  let fixture: ComponentFixture<SubspecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubspecializationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubspecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
