import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeVieweventComponent } from './attendee-viewevent.component';

describe('AttendeeVieweventComponent', () => {
  let component: AttendeeVieweventComponent;
  let fixture: ComponentFixture<AttendeeVieweventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeVieweventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeVieweventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
