import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgnKidsComponent } from './lgn-kids.component';

describe('LgnKidsComponent', () => {
  let component: LgnKidsComponent;
  let fixture: ComponentFixture<LgnKidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LgnKidsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LgnKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
