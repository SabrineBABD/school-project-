import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  connectedUser:any
  students: any[] = []
  id: any
  course: any = {}
  constructor(private activatedRoute: ActivatedRoute ,private courseService:CoursesService,private userService:UsersService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
    this.getAllUsers()
    this.getCourseById()
    this.getAssignStudent()
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
    const allUsers=res.data
  this.connectedUser=allUsers.find((user) => user._id ===this.userService.connectedUserId )
   })
  }
  getCourseById() {

    this.courseService.getCourseById(this.id).subscribe((result)=>{
      this.course=result.data

    })
  }

  getAssignStudent(){
    this.courseService.getAssignStudent(this.id).subscribe((res)=>{
      const AllAssignedStudents=res.data
      this.students=AllAssignedStudents.filter((student) => student.courseId===this.id)
      console.log(this.students);
    })
  }

  deleteStudentFromList( studentId: string): void { 
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.courseService.deleteStudentFromList(this.id,studentId).subscribe(
            () => {
              console.log('Student deleted successfully.');
              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'The student has been deleted.',
                icon: 'success'
              }).then(() => {
                // Optionally, refresh the student list or perform other actions
                this.getAssignStudent();
              });
            },
            (error) => {
              console.error('Error deleting student:', error);
              swalWithBootstrapButtons.fire({
                title: 'Error',
                text: 'An error occurred while deleting the student.',
                icon: 'error'
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'The student is safe.',
            icon: 'error'
          });
        }
      });
  }
}