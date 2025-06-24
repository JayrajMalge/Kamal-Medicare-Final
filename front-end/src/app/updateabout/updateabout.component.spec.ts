import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateaboutComponent } from './updateabout.component';

describe('UpdateaboutComponent', () => {
  let component: UpdateaboutComponent;
  let fixture: ComponentFixture<UpdateaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateaboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
