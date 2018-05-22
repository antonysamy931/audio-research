import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringCustomerBranchesComponent } from './monitoring-customer-branches.component';

describe('MonitoringCustomerBranchesComponent', () => {
  let component: MonitoringCustomerBranchesComponent;
  let fixture: ComponentFixture<MonitoringCustomerBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringCustomerBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringCustomerBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
