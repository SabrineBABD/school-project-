import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseUrl = "http://localhost:2000/courses"
  constructor(private http:HttpClient) { }

  private createCourseFormData(course: any, teacherId: string, cpdf: File): FormData {
    const formData = new FormData();
    formData.append('speciality', course.speciality);
    formData.append('name', course.name);
    formData.append('teacherId', teacherId);
    formData.append('students', course.students);
    formData.append('desc', course.desc);
    formData.append('cpdf', cpdf);
    return formData;
  }

  addCourse(course: any, teacherId: string, cpdf: File): Observable<any> {
    const formData = this.createCourseFormData(course, teacherId, cpdf);
    return this.http.post<{ message: any }>(this.courseUrl, formData);
  }

  updateCourse(course: any, teacherId: string, cpdf: File): Observable<any> {
    const formData = this.createCourseFormData(course, teacherId, cpdf);
    return this.http.put(`${this.courseUrl}/${course._id}`, formData);
  }
    getCourseById(id:any){
      return this.http.get<{data:any}>(`${this.courseUrl}/${id}`)
    } 

    assignStudent(assignmentData: any){
      return this.http.post<{ message: any }>(this.courseUrl+'/assign',assignmentData);
    }
    getAssignStudent(id:any){
      return this.http.get<{data:any}>(`${this.courseUrl}/assign/${id}`)
    }

    getAssignedCoursesForStudent(studentId:any){
      return this.http.get<{data:any}> (`${this.courseUrl}/assigned-courses/${studentId}`);
    }

    getAllCourses(){
      return this.http.get<{data:any}>(this.courseUrl)
    }

    
    getCourseDownloadUrl(courseId: string): Observable<any> {
      return this.http.get(`${this.courseUrl}/download/${courseId}`);
  }
  deleteCourse(id:any): Observable<any> {
    return this.http.delete(`${this.courseUrl}/${id}`);
  }
  deleteStudentFromList(courseId: string, studentId: string): Observable<any> {
    return this.http.delete(`${this.courseUrl}/${courseId}/${studentId}`);
  }
 
}
