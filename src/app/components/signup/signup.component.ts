import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MustMatch } from 'src/app/shared/confirmPwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  cv: any

  imagePreview=""
  image:any
  role: string;
  status:boolean;
  signupForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {
    this.role = this.activatedRouter.snapshot.paramMap.get('role')
    this.status = (this.role === 'Teacher') ? false : true;
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.minLength(3), Validators.required]],
      lastName: ['', [Validators.minLength(3), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      tel: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: ['', [Validators.minLength(3), Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      cPassword: [''],
      role:[this.role],
      status:[this.status],
    }
      ,
      {
        validators: MustMatch('password', 'cPassword')
      }
    )

    this.addOtherFields()
  }
  addOtherFields() {

    if (this.role === 'Parent') {
      this.signupForm.addControl('childTel', this.formBuilder.control('', [Validators.required, Validators.pattern(/^\d{8}$/)]));
    } else if (this.role === 'Teacher') {
      this.signupForm.addControl('speciality', this.formBuilder.control('', [Validators.minLength(3), Validators.required]));
    }
  }

  onImageSelected(event:any){
    const file = event.target.files[0];
    this.image=file;
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  onFileSelected(event:any){
    const file = event.target.files[0];
    this.cv=file;
  }
  


  signup() {
    console.log(this.signupForm.value);
    console.log(this.signupForm.invalid);
    console.log(this.signupForm.errors);


    this.userService.signup(this.signupForm.value,this.image,this.cv).subscribe((res) => {
      console.log(res.message);

    })
  }

  }
