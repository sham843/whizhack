import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainingScheduleComponent } from './view-training-schedule.component';

describe('ViewTrainingScheduleComponent', () => {
  let component: ViewTrainingScheduleComponent;
  let fixture: ComponentFixture<ViewTrainingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTrainingScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTrainingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
