import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsNewsComponent } from './blogs-news.component';

describe('BlogsNewsComponent', () => {
  let component: BlogsNewsComponent;
  let fixture: ComponentFixture<BlogsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
