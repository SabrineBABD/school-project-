import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  connectedUserId: string | null = null;

  setConnectedUserId(id: string | null) {
    this.connectedUserId = id;
  }
  userUrl = "http://localhost:2000"
  constructor(private http:HttpClient ) { }

   signup(user: any, image:File,cv:File){
    const formData=new FormData()
    formData.append('image',image)
    formData.append('cv',cv)
    formData.append('firstName', user.firstName)
    formData.append('lastName', user.lastName)
    formData.append('email',user.email)
    formData.append('password',user.password)
    formData.append('address',user.address)
    formData.append('tel',user.tel)
    formData.append('speciality',user.speciality)
    formData.append('childTel',user.childTel)
    formData.append('role',user.role)
    formData.append('status',user.status)
    return this.http.post<{message:any}>(this.userUrl + '/api/signup/:role',formData) 
    }


  login(user: any) {
    return this.http.post<{message:any,user:any}>(this.userUrl + '/api/login', user)
  }

  getAllUsers(){
    
    return this.http.get<{data:any}>(this.userUrl+'/users')
  }

  deleteUser(id:any){
    console.log("here service");
    
    return this.http.delete<{message:any}>(`${this.userUrl}/users/${id}`)
  }

  updateStatus(user:any){
  
    return this.http.put(`${this.userUrl}/users/${user._id}/status`,user)
  }

  filterTeacherBySpeciality(data:any){
    return this.http.post<{teachers:any[]}>(`${this.userUrl}/teachers/filter`,data)

  }
 
  
  filterStudent(data:any){
    return this.http.post<{students:any[]}>(`${this.userUrl}/students/filter`,data)

  }
  getCVDownloadUrl(u: string): Observable<any> {
    return this.http.get(`${this.userUrl}/download/${u}`);
}
}
