import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class SocketBranchService {

  constructor(private authservice: AuthService) { }

  JoinBranchPage(socket: any, branchid: string){
    socket.emit("branchjoin", branchid);
  }

  LeaveBranchPage(socket: any, branchid: string){
    socket.emit("branchleave", branchid);
  }
}
