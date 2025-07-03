import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlognewsComponent } from './blognews.component';

describe('BlognewsComponent', () => {
  let component: BlognewsComponent;
  let fixture: ComponentFixture<BlognewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlognewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlognewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
