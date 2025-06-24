import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeacializationpageComponent } from './speacializationpage.component';

describe('SpeacializationpageComponent', () => {
  let component: SpeacializationpageComponent;
  let fixture: ComponentFixture<SpeacializationpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeacializationpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeacializationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
