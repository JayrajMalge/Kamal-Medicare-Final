import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateNewsComponent } from './addupdate-news.component';

describe('AddupdateNewsComponent', () => {
  let component: AddupdateNewsComponent;
  let fixture: ComponentFixture<AddupdateNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddupdateNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddupdateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
