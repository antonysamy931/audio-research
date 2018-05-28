import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserUpdateComponent } from './customer-user-update.component';

describe('CustomerUserUpdateComponent', () => {
  let component: CustomerUserUpdateComponent;
  let fixture: ComponentFixture<CustomerUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
