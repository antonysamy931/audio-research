import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAudioListenComponent } from './branch-audio-listen.component';

describe('BranchAudioListenComponent', () => {
  let component: BranchAudioListenComponent;
  let fixture: ComponentFixture<BranchAudioListenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAudioListenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAudioListenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
