import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchViewUsersComponent } from './branch-view-users.component';

describe('BranchViewUsersComponent', () => {
  let component: BranchViewUsersComponent;
  let fixture: ComponentFixture<BranchViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchViewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
