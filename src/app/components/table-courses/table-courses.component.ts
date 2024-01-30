import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.css']
})
export class TableCoursesComponent implements OnInit {
  courses:any=[]
  users:any
  connectedUser:any
  teacherCourses:any
  assignedCourses:any=[]
  filteredCourses:any
  obj:any
  constructor(private _router: Router, private courseService:CoursesService,private userService:UsersService) { }

  ngOnInit() {
   this.getAllUsers()
  }

  navigateTo(id: any, path: string) {
    this._router.navigate([path + id])
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
    const allUsers=res.data
  this.connectedUser=allUsers.find((user) => user._id ===this.userService.connectedUserId )
  this.getAllCourses()
   })
  }

  getAllCourses(){ 
   if (this.connectedUser.role === 'Admin') {
     this.courseService.getAllCourses().subscribe((res) => {
     this.courses = res.data;
    
      });
   }else if (this.connectedUser.role ==='Teacher') {

      this.courseService.getAllCourses().subscribe((res) => {
        const allCourses=res.data
      this.courses = allCourses.filter(course => course.teacherId._id===this.connectedUser._id);
     
      console.log("thhhiiiissss",this.courses);
    });
  }else if (this.connectedUser.role === 'Student') {
    this.courseService.getAssignedCoursesForStudent(this.connectedUser._id).subscribe((res) => {
      this.assignedCourses = res.data;
      console.log( "assiiigned courses", this.assignedCourses);
      console.log( "assiiigned courses");
      
    });
  }else if (this.connectedUser.role === 'Parent') {
     this.courseService.getAllCourses().subscribe((res)=>{
      const allCourses=res.data
      this.courses = allCourses.filter(course =>
        course.students.some(student => student.tel === this.connectedUser.childTel)
      ); 
      console.log("Filtered courses", this.courses);
    })
}
}
  getCourseDownloadUrl(courseId: string): void {
    this.courseService.getCourseDownloadUrl(courseId).subscribe((response: any) => {
        console.log(response.data);  // The download URL for the course
    });
}

deleteCourse(courseId: string): void {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure you want to delete this course?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        this.courseService.deleteCourse(courseId).subscribe(
          () => {
            // Course deleted successfully
            swalWithBootstrapButtons.fire({
              title: 'Deleted!',
              text: 'Your course has been deleted.',
              icon: 'success'
            }).then(() => {
              // Optionally, refresh the course list or perform other actions
              this.getAllCourses();
            });
          },
          (error) => {
            // Handle error if the course deletion fails
            console.error('Error deleting course:', error);
            swalWithBootstrapButtons.fire({
              title: 'Error',
              text: 'An error occurred while deleting the course.',
              icon: 'error'
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No, cancel"
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Your course is safe.',
          icon: 'error'
        });
      }
    });
}




}
