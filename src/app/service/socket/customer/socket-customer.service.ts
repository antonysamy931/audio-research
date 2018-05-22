import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class SocketCustomerService {

  constructor() { }
  private authservice: AuthService = new AuthService();
  
  GetCustomer(socket: any){
    socket.emit('Customers', this.authservice.GetRawToken());
  }

  GetCustomerBranches(socket: any, customerid: string){
    socket.emit('CustomerBranches',customerid);
  }

}
