import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureCareerComponent } from './culture-career.component';

describe('CultureCareerComponent', () => {
  let component: CultureCareerComponent;
  let fixture: ComponentFixture<CultureCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultureCareerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultureCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
