import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketingDetailComponent } from './ticketing-detail.component';

describe('TicketingDetailComponent', () => {
  let component: TicketingDetailComponent;
  let fixture: ComponentFixture<TicketingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
