import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  id: any
  course: any = {}
  results:any=[]
  connectedUser:any
  constructor(private activatedRoute: ActivatedRoute ,private resultService:ResultService,private usersService:UsersService ) { }

  async ngOnInit() {
   await this.getAllUsers()
 
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.getResultStudent()
  }

  async getAllUsers() {
    try {
      const res = await this.usersService.getAllUsers().toPromise();
      const allUsers = res.data;
      this.connectedUser = allUsers.find((user) => user._id === this.usersService.connectedUserId);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

 
  getResultStudent(){
    console.log("111")
    if(this.connectedUser && this.connectedUser.role === 'Student'){
 this.resultService.getResultStudent().subscribe((res)=>{
   const resultStudent=res.data
   this.results = resultStudent.filter(result => (result.courseId._id===this.id)&&(result.studentId._id===this.usersService.connectedUserId));
 console.log("res",this.results);
  })

 }else if( this.connectedUser ){
  console.log("hiiiiii")
  this.resultService.getResultStudent().subscribe((res)=>{
    const resultChild=res.data
    this.results = resultChild.filter(result => (result.courseId._id===this.id));
  console.log("res",this.results);
   })
 }
 }  


}
