import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminApiService } from 'src/app/services/admin-api.service';

export interface MenuData {
  _id: string
  name: string;
  parentMenu: string;
  menuDescription: string;
  order: number;
  status: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuForm!: FormGroup
  isMenuForm: boolean = false
  isMenuTable: boolean = true

  MENU_DATA: MenuData[] = [
    // { id: '1', name: 'sauravsinh', parentMenu: "", menuDescription: "", order: 8, status: true },
    // { id: '2', name: 'kevalsinh', parentMenu: "", menuDescription: "", order: 7, status: false },
    // { id: '3', name: 'bhargavsinh', parentMenu: "", menuDescription: "", order: 6, status: true },
    // { id: '4', name: 'piyush', parentMenu: "", menuDescription: "", order: 5, status: false },
  ];


  parentMenuOptions: string[] = [];

  displayedColumns: string[] = ["name", "parentMenu", "menuDescription", "order", "status", "actions"];
  dataSource!: MatTableDataSource<MenuData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private _adminApiService: AdminApiService) {

  }

  ngOnInit(): void {
    this.getData();
    this.initForm()
  }

  initForm() {
    this.menuForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      parentMenu: [''],
      menuDescription: [''],
      order: [0],
      status: [false],
    });
  }

  getData() {
    
    this._adminApiService.getmenus().subscribe(menus => {
      this.MENU_DATA = menus
      this.dataSource = new MatTableDataSource(this.MENU_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


      this.parentMenuOptions = this.MENU_DATA
        .filter(menu => !menu.parentMenu) // Keep only menus without a parent
        .map(menu => menu.name);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleStatus(element: MenuData) {
    element.status = !element.status;
    this._adminApiService.updateMenu(element._id, element).subscribe(
      response => {
        console.log('Status updated successfully:', response);
      },
    );
  }


  onSubmit() {
    if (this.menuForm.valid) {
      const payload: any = {
        // _id: this.menuForm.value._id || '',
        name: this.menuForm.value.name,
        parentMenu: this.menuForm.value.parentMenu,
        menuDescription: this.menuForm.value.menuDescription,
        order: this.menuForm.value.order,
        status: this.menuForm.value.status
      };

      if (this.menuForm.value._id) {
        payload["_id"] = this.menuForm.value._id,
          this._adminApiService.updateMenu(payload._id, payload).subscribe(
            response => {
              console.log('Menu updated successfully:', response);
              this.getData();
              this.resetForm();
            },
            error => {
              console.error('Error updating menu:', error);
            }
          );

      } else {
        this._adminApiService.createMenu(payload).subscribe(
          response => {
            console.log('Menu created successfully:', response);
            this.getData();
            this.resetForm();
          },
          error => {
            console.error('Error creating menu:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.menuForm.reset();
    this.isMenuForm = false;
    this.isMenuTable = true;
  }

  editMenu(element: any) {
    this.menuForm.patchValue({
      _id: element._id,
      name: element.name,
      parentMenu: element.parentMenu,
      menuDescription: element.menuDescription,
      order: element.order,
      status: element.status
    });
    console.log('status', status)

    this.isMenuForm = true;
    this.isMenuTable = false;
  }

  deleteMenu(element: any) {
    console.log('element', element)
    if (confirm('Are you sure you want to delete this item?')) {
      this._adminApiService.deleteMenu(element).subscribe({
        next: () => {
          console.log('Menu deleted successfully');
          this.getData(); // Refresh the data
        },
        error: (err) => {
          console.error('Error deleting menu:', err);
        },
      });
    }
  }


  // deleteMenu(element: any) {
  //   console.log('element', element)
  //   if (confirm('Are you sure you want to delete this item?')) {
  //     this._adminApiService.deleteMenu(element).subscribe({
  //       next: () => {
  //         console.log('Role deleted successfully');
  //         this.getData();
  //       },
  //       error: (err) => {
  //         console.error('Error deleting role:', err);
  //       },
  //     });
  //   }
  // }

  addNewMenu() {
    this.isMenuForm = true
    this.isMenuTable = false
  }

  onCancel() {
    this.isMenuForm = false
    this.isMenuTable = true
  }

}




