import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAudioMapComponent } from './group-audio-map.component';

describe('GroupAudioMapComponent', () => {
  let component: GroupAudioMapComponent;
  let fixture: ComponentFixture<GroupAudioMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAudioMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAudioMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
