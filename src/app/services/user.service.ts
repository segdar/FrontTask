import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "../models/user.model";
import { environment } from "../../environment";



@Injectable({
  providedIn: 'root'
}) 
export class UserService {

  private readonly svhttp = inject(HttpClient);
  private readonly baseurl = environment.apiUrl;
  private readonly apiuser = 'users'

  public getUsers(data: Omit<User, 'id'>) {

    return this.svhttp.get(`${this.baseurl}/${this.apiuser}/${data.email}`);


  }

  public createUser(user: Omit<User,'id'>) {
    return this.svhttp.post(`${this.baseurl}/${this.apiuser}`, user);

  }


}


