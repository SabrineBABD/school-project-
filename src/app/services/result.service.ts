import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  resultUrl = "http://localhost:2000/results"
  constructor(private http:HttpClient) { }
  
  addResult(resultData: any){
      return this.http.post<{ message: any }>(this.resultUrl,resultData);
  } 
  updateResult(id:any,resultData: any): Observable<any>{
    console.log('Update Result Data:', resultData);
    return this.http.put(`${this.resultUrl}/${id}`,resultData);
  }
  getResultById(id:any){
    return this.http.get<{data:any}>(`${this. resultUrl }/${id}`)
  } 
  getResultStudent(){
    return this.http.get<{data:any}>(this.resultUrl)
  }
  deleteResult(resultId: string): Observable<any> {
    return this.http.delete(`${this.resultUrl}/${resultId}`);
  } 
}
