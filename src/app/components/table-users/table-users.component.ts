import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { ResultService } from 'src/app/services/result.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit {
users:any=[]
obj:any
  constructor(private userService: UsersService,private courseService:CoursesService ,private resultService:ResultService) { }

  ngOnInit() {
  this.getAllUsers()
  }
getAllUsers(){
  this.userService.getAllUsers().subscribe((res)=>{
    const allUsers=res.data
this.users=allUsers.filter((user) => user.status === true)
console.log(this.users);
  })
}


 
deleteUser() {
console.log("hiii");

  if (this.obj._id) {
    this.userService.deleteUser(this.obj._id).subscribe(()=>{
      this.getAllUsers()
    })
  }
}

reserveId(u:any){
  this.obj=u 
 }
}
