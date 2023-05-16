import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaFloatingButtonComponent } from './cta-floating-button.component';

describe('CtaFloatingButtonComponent', () => {
  let component: CtaFloatingButtonComponent;
  let fixture: ComponentFixture<CtaFloatingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtaFloatingButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaFloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
