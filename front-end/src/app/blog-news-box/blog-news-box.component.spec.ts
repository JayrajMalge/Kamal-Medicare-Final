import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogNewsBoxComponent } from './blog-news-box.component';

describe('BlogNewsBoxComponent', () => {
  let component: BlogNewsBoxComponent;
  let fixture: ComponentFixture<BlogNewsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogNewsBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogNewsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
