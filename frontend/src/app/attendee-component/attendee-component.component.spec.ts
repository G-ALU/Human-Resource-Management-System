import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeComponentComponent } from './attendee-component.component';

describe('AttendeeComponentComponent', () => {
  let component: AttendeeComponentComponent;
  let fixture: ComponentFixture<AttendeeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
