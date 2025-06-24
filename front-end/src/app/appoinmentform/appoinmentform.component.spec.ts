import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentformComponent } from './appoinmentform.component';

describe('AppoinmentformComponent', () => {
  let component: AppoinmentformComponent;
  let fixture: ComponentFixture<AppoinmentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppoinmentformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppoinmentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
