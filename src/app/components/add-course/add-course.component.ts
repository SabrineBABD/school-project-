import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  title: string = "Add Course"
  id:any
  filePreview=""
  uniqueSpecialities:any = []
  users:any
  course:any={
    speciality: '',
    name: '',
    desc: ''
  }
  cpdf:any
addcourseForm!:FormGroup
  constructor(private activatedRoute:ActivatedRoute,private courseService:CoursesService,private userService : UsersService , private courService:CoursesService) { }

  ngOnInit() :void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id) {
      this.title = "Edit Course"
      this.getCourseById()
    }
   this. getAllUsers()
  }

  getCourseById() {

    this.courseService.getCourseById(this.id).subscribe((result)=>{
      this.course=result.data

    })
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      const allUsers=res.data
  this.users=allUsers.filter((user) => user.role === "Teacher")
  this.uniqueSpecialities = Array.from(new Set(this.users.map(user => user.speciality)));
  console.log(this.users);
    })
  }

  onFileSelected(event:any){
    const file = event.target.files[0];
    this.cpdf=file;
  
  }

 
  

  




addEditCourse(){

  if (this.id) {  this.courService.updateCourse(this.course,this.userService.connectedUserId as string,this.cpdf).subscribe(()=>{
    console.log("updated");
    
  })
}else{
  this.courService.addCourse(this.course,this.userService.connectedUserId as string,this.cpdf).subscribe((result)=>{
    console.log(result.message);

   })
}
}

}
