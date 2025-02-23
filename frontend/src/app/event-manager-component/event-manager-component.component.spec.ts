import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagerComponentComponent } from './event-manager-component.component';

describe('EventManagerComponentComponent', () => {
  let component: EventManagerComponentComponent;
  let fixture: ComponentFixture<EventManagerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventManagerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventManagerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
