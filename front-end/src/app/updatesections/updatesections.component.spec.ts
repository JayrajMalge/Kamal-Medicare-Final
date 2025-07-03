import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesectionsComponent } from './updatesections.component';

describe('UpdatesectionsComponent', () => {
  let component: UpdatesectionsComponent;
  let fixture: ComponentFixture<UpdatesectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatesectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
