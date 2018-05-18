import { OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { SocketInitService } from '../service/socket/socket-init.service';

export abstract class Common implements OnInit, AfterViewInit{
    constructor(public router:Router){          
    }
    public UnAuthorizeMessage: string = "";
    public BackUrl: string = "";

    private auth: AuthService = new AuthService();
    private socketinit: SocketInitService = new SocketInitService();

    ngOnInit() {                
        if(!this.auth.IsLoggedIn()){            
            this.router.navigateByUrl('/login');
        }
    }    

    ngAfterViewInit(){
        if(this.auth.IsLoggedIn() && this.auth.IsBranchUser()){
            this.BranchUser();
        } else if(this.auth.IsLoggedIn() && this.auth.IsCustomerUser()){
            this.CustomerUser();
        }
    }

    BranchUser(){        
        var CurrentUrl: string = window.location.href.split(window.location.host)[1];
        if(CurrentUrl.includes('branch-audio-listen')){
            return true;
        }else if(CurrentUrl === '/' || CurrentUrl.includes('dashboard')){
            this.router.navigateByUrl('/branch-audio-listen/'+this.auth.GetBranchId());
        }else{            
            this.router.navigateByUrl('/un-authorized');
        }
    }

    LoadUnauthorizedError(){
        if(this.auth.IsBranchUser()){
            this.UnAuthorizeMessage = this.auth.GetUserName() + " not enough priviladge to access this page."
            this.BackUrl = '/branch-audio-listen/'+this.auth.GetBranchId();
        }
    }

    CustomerUser(){

    }

    Redirect(url){
        this.router.navigateByUrl(url);
    }

    Logout(){
        localStorage.clear();
        this.router.navigateByUrl('/login');
        this.socketinit.LogOut();
    }
}
