import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUploadFileComponent } from './branch-upload-file.component';

describe('BranchUploadFileComponent', () => {
  let component: BranchUploadFileComponent;
  let fixture: ComponentFixture<BranchUploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchUploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
