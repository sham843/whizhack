import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZeroHackComponent } from './zero-hack.component';

describe('ZeroHackComponent', () => {
  let component: ZeroHackComponent;
  let fixture: ComponentFixture<ZeroHackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZeroHackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZeroHackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
