import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { UsersService } from 'src/app/services/users.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    $(".hero-slide").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      nav: true, 
      navText: ["<span class='icon-arrow-left'></span>", "<span class='icon-arrow-right'></span>"],
    });
  }
  courses: any[] = [];
  limit: number = 6;
  teachers: any[] = [];
  students:any

  constructor(private courseService:CoursesService,private userService:UsersService) { }
 
  ngOnInit() {
    this.getAllCourses()
    this.getAllTeachers()
  }

  getAllCourses(){ 
      this.courseService.getAllCourses().subscribe((res) => {
      this.courses = res.data;
      console.log("coooo",this.courses);
      
     })
}

  getCourseDownloadUrl(courseId: string): void {
     this.courseService.getCourseDownloadUrl(courseId).subscribe((response: any) => {
      console.log(response.data);  // The download URL for the course
  });
}
getAllTeachers(){
  this.userService.getAllUsers().subscribe((res) => {
    const users=res.data; 
    this.teachers = users.filter((user) =>( user.role ==="Teacher")&&(user.status ===true) )
  });
}


}