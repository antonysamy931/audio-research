import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringBranchPlayerComponent } from './monitoring-branch-player.component';

describe('MonitoringBranchPlayerComponent', () => {
  let component: MonitoringBranchPlayerComponent;
  let fixture: ComponentFixture<MonitoringBranchPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoringBranchPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringBranchPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
