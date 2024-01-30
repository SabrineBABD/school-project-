import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { ResultService } from 'src/app/services/result.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.css']
})
export class AddResultComponent implements OnInit {
  addResultForm!:FormGroup
  title: string = "Add Result"
  courses:any=[]
  students:any=[]
  selectedCourse:string=""
  selectedStudent:string=""
  selectedEvaluation:string=""
  note:number
  id:any
  resultToUpdate:any
  constructor(private activatedRoute:ActivatedRoute,private userService : UsersService , private courService:CoursesService,private resultService:ResultService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = "Edit Result";
      this.getResultById();
    }
    this.getAllCourses();
  
  }
  


  
 getResultById() {
  this.resultService.getResultById(this.id).subscribe((result) => {
    this.resultToUpdate = result.data;

    // Set the initial values for selection
    this.selectedCourse = this.resultToUpdate.courseId;
    this.getAssignStudent()
    this.selectedStudent = this.resultToUpdate.studentId;
    this.note = this.resultToUpdate.note;
    this.selectedEvaluation = this.resultToUpdate.evaluation;
  });
}

    getAllCourses(){
      this.courService.getAllCourses().subscribe((res)=>{
        const allCourses=res.data
        this.courses=allCourses.filter((course)=>course.teacherId._id===this.userService.connectedUserId )
        console.log("ccc",this.userService.connectedUserId );
        
      })
    }

    onCourseChange() {
      this.getAssignStudent();
  }
  getAssignStudent(){
    this.courService.getAssignStudent(this.selectedCourse).subscribe((res)=>{
      const AllAssignedStudents=res.data
      this.students=AllAssignedStudents.filter((student) => student.courseId===this.selectedCourse)
      console.log("sss",this.students);
    })
  }

  addEditResult(){
    const resultData = {
      courseId: this.selectedCourse,
      studentId: this.selectedStudent,
      note:this.note,
      evaluation: this.selectedEvaluation,
    };
    if (this.id) { this.resultService.updateResult(this.id,resultData).subscribe(()=>{
      console.log("updated");
      
    })
  }else{
    this.resultService.addResult(resultData).subscribe((result)=>{
      console.log(result.message);
      
     })
  }
 
  }

}
