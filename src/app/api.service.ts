import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  addFormData=(data:FormData)=>{
    return this.http.post("http://localhost:8080/upload",data)
  }
  viewItems=()=>{
    return this.http.get("http://localhost:8080/view")
  }
}
