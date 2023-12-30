import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaSharedComponent } from './cta-shared.component';

describe('CtaSharedComponent', () => {
  let component: CtaSharedComponent;
  let fixture: ComponentFixture<CtaSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CtaSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtaSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
