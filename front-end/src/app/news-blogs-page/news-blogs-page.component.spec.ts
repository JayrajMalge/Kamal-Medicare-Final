import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBlogsPageComponent } from './news-blogs-page.component';

describe('NewsBlogsPageComponent', () => {
  let component: NewsBlogsPageComponent;
  let fixture: ComponentFixture<NewsBlogsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsBlogsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsBlogsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
