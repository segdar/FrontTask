import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environment";
import { Task } from "../models/task.model";
import { Observable, map } from "rxjs";
import { response } from "../models/response.model";



@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private readonly svhttp = inject(HttpClient);
  private readonly baseurl = environment.apiUrl;
  private readonly apiuser = 'tasks'


  public getTaskAll():Observable<Task[]>{

    return this.svhttp.get(`${this.baseurl}/${this.apiuser}`).pipe(map(data => {
      return (data as response).value as Task[];
    }));

  }

  public taskUpdate(task: Partial<Task>): Observable<boolean> {
    const id = task.id;
    delete task.id;
    return this.svhttp.put(`${this.baseurl}/${this.apiuser}/${id}`, task).pipe(map(data => {
      const respon = data as response;
      
      const issave = respon.status && respon.value ? true : false;
      return issave;
    }));
  }

  public taskCreate(task: Omit<Task, 'id' | 'status'|'date_creation'>):Observable<boolean> {
    return this.svhttp.post(`${this.baseurl}/${this.apiuser}`, task).pipe(map(data => {
      const respon = data as response;
      const issave = respon.status && respon.value ? true : false; 
      return issave;
    }));
  }

  public taskDelete(task: Task):Observable<boolean> {
    return this.svhttp.delete(`${this.baseurl}/${this.apiuser}/${task.id}`).pipe(map(data => {

      const respon = data as response;
      const issave = respon.status && respon.value ? true : false;
      return issave
    }));
  }





}
