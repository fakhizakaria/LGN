import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgnadultsComponent } from './lgnadults.component';

describe('LgnadultsComponent', () => {
  let component: LgnadultsComponent;
  let fixture: ComponentFixture<LgnadultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LgnadultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LgnadultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
