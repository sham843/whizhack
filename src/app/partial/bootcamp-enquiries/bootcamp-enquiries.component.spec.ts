import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampEnquiriesComponent } from './bootcamp-enquiries.component';

describe('BootcampEnquiriesComponent', () => {
  let component: BootcampEnquiriesComponent;
  let fixture: ComponentFixture<BootcampEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
