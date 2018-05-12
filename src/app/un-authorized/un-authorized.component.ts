import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Common } from '../class/common';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.css']
})
export class UnAuthorizedComponent extends Common implements OnInit {

  constructor(public router: Router) {
    super(router);
   }

  ngOnInit() {
    this.LoadUnauthorizedError();
  }

}
