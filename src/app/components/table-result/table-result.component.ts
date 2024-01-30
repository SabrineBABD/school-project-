import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.css']
})
export class TableResultComponent implements OnInit {
  id: any
  course: any = {}
  results:any=[]
  connectedUser:any
  constructor(private _router: Router,private activatedRoute: ActivatedRoute ,private resultService:ResultService ,private userService:UsersService ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")
  this. getAllUsers()
    this.getResultStudent()

  }
  
  navigateTo(id: any, path: string) {
    this._router.navigate([path + id])
  }
  getResultStudent(){
 this.resultService.getResultStudent().subscribe((res)=>{
   const resultStudent=res.data
   this.results = resultStudent.filter(result => result.courseId._id===this.id); 
 })
 } 
 getAllUsers(){
  this.userService.getAllUsers().subscribe((res)=>{
  const allUsers=res.data
this.connectedUser=allUsers.find((user) => user._id ===this.userService.connectedUserId )
 })
}
deleteResult(resultId:string): void{
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
          this.resultService.deleteResult(resultId).subscribe(    
            () => {
              console.log('Result deleted successfully.');
              swalWithBootstrapButtons.fire({
                title: 'Deleted!',
                text: 'The result has been deleted.',
                icon: 'success'
              }).then(() => {
                this.getResultStudent();
              });
            },
            (error) => {
              console.error('Error deleting result', error);
              swalWithBootstrapButtons.fire({
                title: 'Error',
                text: 'An error occurred while deleting the result.',
                icon: 'error'
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'The result is safe.',
            icon: 'error'
          });
        }
      });
  }
}


