import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeacializationpagefullComponent } from './speacializationpagefull.component';

describe('SpeacializationpagefullComponent', () => {
  let component: SpeacializationpagefullComponent;
  let fixture: ComponentFixture<SpeacializationpagefullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeacializationpagefullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeacializationpagefullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
