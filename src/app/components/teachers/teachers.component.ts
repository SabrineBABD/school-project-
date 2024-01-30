import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  filterForm !: FormGroup
  filter:any={}
 teachers:any=[]
 filteredTeachers: any[] = [];
  constructor(private fb: FormBuilder, private userService:UsersService) { this.filterForm = this.fb.group({
    speciality: ['']
  });
}

  ngOnInit(): void {
  this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((res) => {
      const users=res.data; 
      this.teachers = users.find((user) => user.role ==="Teacher" )
    });
  }


  filterTeacher(){
    console.log(this.filter);
    
    this.userService.filterTeacherBySpeciality(this.filter).subscribe((result)=>{
      this.filteredTeachers=result.teachers
    })

    }
  }