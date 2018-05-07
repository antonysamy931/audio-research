import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerBranchComponent } from './update-customer-branch.component';

describe('UpdateCustomerBranchComponent', () => {
  let component: UpdateCustomerBranchComponent;
  let fixture: ComponentFixture<UpdateCustomerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCustomerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
