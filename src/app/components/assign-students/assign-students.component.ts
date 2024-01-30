import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-assign-students',
  templateUrl: './assign-students.component.html',
  styleUrls: ['./assign-students.component.css']
})
export class AssignStudentsComponent implements OnInit {
  assignForm!:FormGroup;
  students:any=[];
  teachers:any=[];
  courses:any=[];
  selectedTeacher: string = '';
  selectedCourse: string = '';
  selectedStudent: string = '';

  constructor(private userService : UsersService , private courService:CoursesService) { }

  ngOnInit() {
    this. getAllUsers()
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      const allUsers=res.data
  this.students=allUsers.filter((user) => user.role === "Student")
  this.teachers=allUsers.filter((user) => (user.role === "Teacher")&&(user.status===true))
  console.log(this.teachers);
    })
  }
  onTeacherChange() {
    this.getAllCourses();
}
    getAllCourses(){
      this.courService.getAllCourses().subscribe((res)=>{
        const allCourses=res.data
        this.courses=allCourses.filter((course)=>course.teacherId._id===this.selectedTeacher)
      })
    }
    assignStudent(){
      const assignmentData = {
        courseId: this.selectedCourse,
        studentId: this.selectedStudent,
        teacherId: this.selectedTeacher,
      };
      
      this.courService.assignStudent(assignmentData).subscribe((result)=>{
        console.log(result.message);
      
       })
    }

}
