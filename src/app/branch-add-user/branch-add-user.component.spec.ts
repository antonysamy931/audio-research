import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAddUserComponent } from './branch-add-user.component';

describe('BranchAddUserComponent', () => {
  let component: BranchAddUserComponent;
  let fixture: ComponentFixture<BranchAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
