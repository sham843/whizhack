import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampRegistrationComponent } from './bootcamp-registration.component';

describe('BootcampRegistrationComponent', () => {
  let component: BootcampRegistrationComponent;
  let fixture: ComponentFixture<BootcampRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcampRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcampRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
