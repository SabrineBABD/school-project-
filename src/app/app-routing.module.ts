import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableTeachersComponent } from './components/table-teachers/table-teachers.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TableCoursesComponent } from './components/table-courses/table-courses.component';
import { HomeComponent } from './components/home/home.component';
import { AssignStudentsComponent } from './components/assign-students/assign-students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AddResultComponent } from './components/add-result/add-result.component';
import { TableResultComponent } from './components/table-result/table-result.component';
import { ResultComponent } from './components/result/result.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsSearchComponent } from './components/students-search/students-search.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
{path:"" , component:HomeComponent},
{path:"signup/:role" , component:SignupComponent},
{path:"login" , component:LoginComponent},
{path:"table-users" , component:TableUsersComponent},
{path:"table-teachers" , component:TableTeachersComponent},
{path:"add-course" , component:AddCourseComponent},
{path:"add-course/:id" , component:AddCourseComponent},
{path:"table-courses" , component:TableCoursesComponent},
{path:"assign-students" , component:AssignStudentsComponent},
{path:"students-list/:id" , component:StudentsListComponent},
{path:"add-result" , component:AddResultComponent},
{path:"add-result/:id" , component:AddResultComponent},
{path:"table-result/:id" , component:TableResultComponent},
{path:"result/:id" , component:ResultComponent},
{path:"teachers" , component:TeachersComponent},
{path:"students-search" , component:StudentsSearchComponent},
{path:"contact" , component:ContactComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
