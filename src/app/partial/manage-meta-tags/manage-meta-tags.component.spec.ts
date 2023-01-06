import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMetaTagsComponent } from './manage-meta-tags.component';

describe('ManageMetaTagsComponent', () => {
  let component: ManageMetaTagsComponent;
  let fixture: ComponentFixture<ManageMetaTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMetaTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMetaTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
