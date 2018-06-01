import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../class/uri';

@Injectable()
export class GroupAudioMapServiceService {

  constructor(private http: HttpClient) { }

  private Url: Uri = new Uri();

  
}
