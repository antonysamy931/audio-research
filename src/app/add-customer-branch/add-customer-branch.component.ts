import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

@Component({
  selector: 'app-add-customer-branch',
  templateUrl: './add-customer-branch.component.html',
  styleUrls: ['./add-customer-branch.component.css']
})
export class AddCustomerBranchComponent extends Common implements OnInit {

  constructor(public router: Router) {
    super(router);
   }

  ngOnInit() {
  }

}
