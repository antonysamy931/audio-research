import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { AuthService } from '../../service/auth/auth.service';

@Injectable()
export class SocketInitService {

  private socket;

  private authservice: AuthService = new AuthService();

  constructor() {
    this.socket = io(window.location.origin);    
  }

  LogIn(){
    this.socket.emit("login",this.authservice.GetRawToken());   
  }

  LogOut(){
    this.socket.emit("logout",this.authservice.GetRawToken());
  }  

}
