import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private router:Router,private fb:FormBuilder,private uService:UsersService) { }

  ngOnInit() {
    this.loginForm=this.fb.group({
      email:["",Validators.required],
      password:['',Validators.required]
    })
  }
login(){
  
  this.uService.login(this.loginForm.value).subscribe((res)=>{
    console.log(res.message);
    console.log(res.user);
    if (res.message==="2") {
      sessionStorage.setItem('connectedUser',JSON.stringify(res.user))
      this.router.navigate(['/']);
    } 

  })
}

}
