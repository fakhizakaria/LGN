import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgnteensComponent } from './lgnteens.component';

describe('LgnteensComponent', () => {
  let component: LgnteensComponent;
  let fixture: ComponentFixture<LgnteensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LgnteensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LgnteensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
