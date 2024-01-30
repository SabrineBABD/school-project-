import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-students-search',
  templateUrl: './students-search.component.html',
  styleUrls: ['./students-search.component.css']
})
export class StudentsSearchComponent implements OnInit {

  filterForm !: FormGroup
  filter:any={}
 students:any[]=[]
 filteredStudents: any[] = [];
  constructor(private fb: FormBuilder, private userService:UsersService) { this.filterForm = this.fb.group({
    tel: [''],
    firstName: [''],
    lastName: ['']
  });
}

  ngOnInit(): void {
  this.getAllStudents()
  }

  getAllStudents(){
    this.userService.getAllUsers().subscribe((res) => {
      const users=res.data; 
      this.students = users.filter((user) => user.role ==="Student" )
    });
  }


  filterStudent(){
    const filter = {
      tel: this.filterForm.value.tel,
      firstName: this.filterForm.value.firstName ? this.filterForm.value.firstName.toLowerCase() : '',
      lastName: this.filterForm.value.lastName ? this.filterForm.value.lastName.toLowerCase() : '',
    };
    console.log('Filter Params:', filter);
    this.userService.filterStudent(filter).subscribe((result) => {
      this.filteredStudents = result.students;
    });

    }
  }