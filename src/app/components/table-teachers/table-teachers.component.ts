import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-table-teachers',
  templateUrl: './table-teachers.component.html',
  styleUrls: ['./table-teachers.component.css']
})
export class TableTeachersComponent implements OnInit {

  users:any
  status:boolean=false
  
    constructor(private userService:UsersService ) { }
  

  ngOnInit() {
    this.getAllUsers() 
  }
   
toggleStatus(u){
  
  if (u._id) {
    u.status = !u.status; // Toggle the status locally
    this.userService.updateStatus(u).subscribe(()=>{
      // Update the status on the server
      this.getAllUsers()   // Update the status on the server
    })
  }
}

getCVDownloadUrl(u: string): void {
  this.userService.getCVDownloadUrl(u).subscribe((response: any) => {
      console.log(response.data);  // The download URL for the cv
  });
}

getAllUsers(){
  this.userService.getAllUsers().subscribe((res)=>{
    const allUsers=res.data
    this.users=allUsers.filter((user) => user.role === "Teacher")
    console.log(this.users);
  })
}
}