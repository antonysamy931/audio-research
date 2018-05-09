import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUserUpdateComponent } from './branch-user-update.component';

describe('BranchUserUpdateComponent', () => {
  let component: BranchUserUpdateComponent;
  let fixture: ComponentFixture<BranchUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
