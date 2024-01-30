import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  connectedUser: any

  constructor(private router: Router, private userService: UsersService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    console.log("cc", this.connectedUser);
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('connectedUser');
    if (token) {
      const decoded = jwtDecode(token);

      if (decoded.iat && decoded.exp) {
        console.log("decoded", decoded);
        console.log("exp", new Date(decoded.exp * 1000));
        console.log("iat", new Date(decoded.iat * 1000));
        this.userService.setConnectedUserId((decoded as any).id);
        this.connectedUser = decoded; 
      }
    }
    return !!token;
  }

  logout() {
    sessionStorage.removeItem('connectedUser');
    this.router.navigate(['/']);
  }
}
