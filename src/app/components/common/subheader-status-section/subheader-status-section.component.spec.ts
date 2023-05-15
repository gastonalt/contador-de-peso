import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderStatusSectionComponent } from './subheader-status-section.component';

describe('SubheaderStatusSectionComponent', () => {
  let component: SubheaderStatusSectionComponent;
  let fixture: ComponentFixture<SubheaderStatusSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubheaderStatusSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubheaderStatusSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
