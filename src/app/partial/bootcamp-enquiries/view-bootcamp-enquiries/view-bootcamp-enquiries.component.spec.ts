import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBootcampEnquiriesComponent } from './view-bootcamp-enquiries.component';

describe('ViewBootcampEnquiriesComponent', () => {
  let component: ViewBootcampEnquiriesComponent;
  let fixture: ComponentFixture<ViewBootcampEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBootcampEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBootcampEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
