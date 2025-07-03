import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdatepagesectionComponent } from './udatepagesection.component';

describe('UdatepagesectionComponent', () => {
  let component: UdatepagesectionComponent;
  let fixture: ComponentFixture<UdatepagesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdatepagesectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UdatepagesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
