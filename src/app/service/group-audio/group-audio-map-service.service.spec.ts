import { TestBed, inject } from '@angular/core/testing';

import { GroupAudioMapServiceService } from './group-audio-map-service.service';

describe('GroupAudioMapServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupAudioMapServiceService]
    });
  });

  it('should be created', inject([GroupAudioMapServiceService], (service: GroupAudioMapServiceService) => {
    expect(service).toBeTruthy();
  }));
});
