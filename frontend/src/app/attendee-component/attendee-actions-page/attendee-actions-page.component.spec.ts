import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeActionsPageComponent } from './attendee-actions-page.component';

describe('AttendeeActionsPageComponent', () => {
  let component: AttendeeActionsPageComponent;
  let fixture: ComponentFixture<AttendeeActionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeActionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeActionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
