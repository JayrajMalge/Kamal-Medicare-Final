import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateSpeacializationComponent } from './addupdate-speacialization.component';

describe('AddupdateSpeacializationComponent', () => {
  let component: AddupdateSpeacializationComponent;
  let fixture: ComponentFixture<AddupdateSpeacializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddupdateSpeacializationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddupdateSpeacializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
