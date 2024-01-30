import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BannerComponent } from './components/banner/banner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { TableTeachersComponent } from './components/table-teachers/table-teachers.component';
import { TableCoursesComponent } from './components/table-courses/table-courses.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AssignStudentsComponent } from './components/assign-students/assign-students.component';
import { DetailsComponent } from './components/details/details.component';
import { ResultComponent } from './components/result/result.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AddResultComponent } from './components/add-result/add-result.component';
import { TableResultComponent } from './components/table-result/table-result.component';
import { StudentsSearchComponent } from './components/students-search/students-search.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BannerComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TableUsersComponent,
    TableTeachersComponent,
    TableCoursesComponent,
    AddCourseComponent,
    AssignStudentsComponent,
    DetailsComponent,
    ResultComponent,
    TeachersComponent,
    StudentsListComponent,
    AddResultComponent,
    TableResultComponent,
    StudentsSearchComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
