import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  constructor(private router: Router,
              private  authService: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')===null){
      this.router.navigateByUrl('/login')
    }
  }

  logout(){
    this.authService.logout()
  }

}
