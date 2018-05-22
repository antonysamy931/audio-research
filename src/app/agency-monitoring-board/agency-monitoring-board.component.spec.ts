import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyMonitoringBoardComponent } from './agency-monitoring-board.component';

describe('AgencyMonitoringBoardComponent', () => {
  let component: AgencyMonitoringBoardComponent;
  let fixture: ComponentFixture<AgencyMonitoringBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyMonitoringBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyMonitoringBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
