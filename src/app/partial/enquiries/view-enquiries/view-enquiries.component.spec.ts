import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnquiriesComponent } from './view-enquiries.component';

describe('ViewEnquiriesComponent', () => {
  let component: ViewEnquiriesComponent;
  let fixture: ComponentFixture<ViewEnquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEnquiriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEnquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
