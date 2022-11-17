import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogMasterComponent } from './blog-master.component';

describe('BlogMasterComponent', () => {
  let component: BlogMasterComponent;
  let fixture: ComponentFixture<BlogMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
