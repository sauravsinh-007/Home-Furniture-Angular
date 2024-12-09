import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminApiService } from 'src/app/services/admin-api.service';

export interface roleData {
  _id: string;
  name: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roleForm!: FormGroup
  isRoleForm: boolean = false
  isRoleTable: boolean = true

  ROLE_DATA: roleData[] = [];

  displayedColumns: string[] = ['name', 'isAdmin', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _formBuilder: FormBuilder, private _adminApiService: AdminApiService) { }

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }


  initForm() {
    this.roleForm = this._formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      isAdmin: [false]
    });
  }


  getData() {
    this._adminApiService.getroles().subscribe(roles => {
      this.ROLE_DATA = roles;
      console.log('this.ROLE_DATA', this.ROLE_DATA)
      this.dataSource = new MatTableDataSource(this.ROLE_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onSubmit(): void {
    if (this.roleForm.valid) {
      // const newRole: roleData = {
      //   _id: this.roleForm.value._id || '',
      //   name: this.roleForm.value.name,
      //   isAdmin: this.roleForm.value.isAdmin
      // };
      let payload: any = {
        name: this.roleForm.value.name,
        isAdmin: this.roleForm.value.isAdmin
      }

      if (this.roleForm.value._id) {
        payload['_id'] = this.roleForm.value._id
        this._adminApiService.updateRole(payload._id, payload).subscribe(
          response => {
            console.log('response', response)
            // const index = this.ROLE_DATA.findIndex(role => role._id === newRole._id);
            // if (index !== -1) {
            //   this.ROLE_DATA[index] = response;
            // }
            this.getData();
            this.roleForm.reset();
            this.isRoleForm = false;
            this.isRoleTable = true;
          },
          error => {
            console.error('Error updating role:', error);
          }
        );
      } else {

        this._adminApiService.createRole(payload).subscribe(
          response => {
            console.log('response', response)
            // this.ROLE_DATA.push(response);
            this.getData();
            this.roleForm.reset();
            this.isRoleForm = false;
            this.isRoleTable = true;
          },
          error => {
            console.error('Error creating role:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }


  isNewAddRole() {
    this.isRoleForm = true;
    this.isRoleTable = false;
  }


  isCancel() {
    this.isRoleForm = false;
    this.isRoleTable = true;
  }


  editRole(element: roleData) {
    this.roleForm.patchValue({
      _id: element._id,
      name: element.name,
      isAdmin: element.isAdmin
    });
    this.isRoleForm = true;
    this.isRoleTable = false;
  }





  deleteRole(element: any) {
    console.log('element', element)
    if (confirm('Are you sure you want to delete this item?')) {
      this._adminApiService.deleteRole(element).subscribe({
        next: () => {
          console.log('Role deleted successfully');
          this.getData();
        },
        error: (err) => {
          console.error('Error deleting role:', err);
        },
      });
    }
  }

}
