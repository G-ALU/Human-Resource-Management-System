import { ComponentFixture, TestBed } from '@angular/core/testing';

import { footer3Component } from './footer3.component';

describe('footer3Component', () => {
  let component: footer3Component;
  let fixture: ComponentFixture<footer3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [footer3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(footer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
