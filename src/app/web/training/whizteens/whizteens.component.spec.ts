import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhizteensComponent } from './whizteens.component';

describe('WhizteensComponent', () => {
  let component: WhizteensComponent;
  let fixture: ComponentFixture<WhizteensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhizteensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhizteensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
