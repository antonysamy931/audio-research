import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

export abstract class Common implements OnInit{
    constructor(public router:Router){          
    }

    ngOnInit() {                
        if(!localStorage.getItem('UserId')){            
            this.router.navigateByUrl('/login');
        }
    }    

    Redirect(url){
        this.router.navigateByUrl(url);
    }

    Logout(){
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }
}
