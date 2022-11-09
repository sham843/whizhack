import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberRangeComponent } from './cyber-range.component';

describe('CyberRangeComponent', () => {
  let component: CyberRangeComponent;
  let fixture: ComponentFixture<CyberRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CyberRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
