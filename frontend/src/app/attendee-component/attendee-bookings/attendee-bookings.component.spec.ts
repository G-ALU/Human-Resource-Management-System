import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeBookingsComponent } from './attendee-bookings.component';

describe('AttendeeBookingsComponent', () => {
  let component: AttendeeBookingsComponent;
  let fixture: ComponentFixture<AttendeeBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
