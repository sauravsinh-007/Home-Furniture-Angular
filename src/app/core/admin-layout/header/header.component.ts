import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName!: string
  userImageUrl!: string
  defaultImage: string = '../../../../assets/user_img.jpg'
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData() {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    console.log('user', user)
    if (user) {
      this.userName = user.name || 'Guest';
      this.userImageUrl = user.photo || this.defaultImage;
    }
  }

  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    this._router.navigate(['/login']);
  }

  editUserProfile() {
    this._router.navigate(['/admin/profile']);
  }

}
