import { Component, OnInit } from '@angular/core';
import { MENU } from './menu';
import { menuItem } from './menu.model';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isOpen = true;
  menuIteams!: menuItem[]

  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    this.initialize()
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  initialize() {
    this.menuIteams = MENU
  }

  navigateTo(link: any) {
    this._router.navigate(link)
  }

}
