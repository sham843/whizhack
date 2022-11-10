import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcamptComponent } from './bootcampt.component';

describe('BootcamptComponent', () => {
  let component: BootcamptComponent;
  let fixture: ComponentFixture<BootcamptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootcamptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootcamptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
