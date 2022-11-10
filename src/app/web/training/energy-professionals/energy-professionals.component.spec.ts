import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyProfessionalsComponent } from './energy-professionals.component';

describe('EnergyProfessionalsComponent', () => {
  let component: EnergyProfessionalsComponent;
  let fixture: ComponentFixture<EnergyProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyProfessionalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
