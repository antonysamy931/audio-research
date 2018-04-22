import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioListenComponent } from './audio-listen.component';

describe('AudioListenComponent', () => {
  let component: AudioListenComponent;
  let fixture: ComponentFixture<AudioListenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioListenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioListenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
