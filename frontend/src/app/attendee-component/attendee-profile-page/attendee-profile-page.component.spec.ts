import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeProfilePageComponent } from './attendee-profile-page.component';

describe('AttendeeProfilePageComponent', () => {
  let component: AttendeeProfilePageComponent;
  let fixture: ComponentFixture<AttendeeProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeProfilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
