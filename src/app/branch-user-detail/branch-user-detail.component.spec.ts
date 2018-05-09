import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUserDetailComponent } from './branch-user-detail.component';

describe('BranchUserDetailComponent', () => {
  let component: BranchUserDetailComponent;
  let fixture: ComponentFixture<BranchUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
