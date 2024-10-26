import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminApiService } from 'src/app/services/admin-api.service';

export interface UserData {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  mobileNumber: string;
  status: boolean;
  photo: string;
}

export interface roleData {
  _id: string;
  name: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userForm!: FormGroup;
  isUserForm: boolean = false;
  isUserTable: boolean = true;
  defaultImage: string = "../../../assets/user_img.jpg"
  // defaultImage: string = '../../../assets/errorImage.jpg'


  USER_DATA: UserData[] = [
    // { name: 'John Doe', role: 'Admin', email: 'john@example.com', password: 'password123', mobileNumber: '1234567890', status: true, photo: 'path/to/photo1.jpg' },
    // { name: 'Jane Smith', role: 'User', email: 'jane@example.com', password: 'password123', mobileNumber: '0987654321', status: false, photo: 'path/to/photo2.jpg' },
  ];

  displayedColumns: string[] = ["photo", "name", "role", "email", "mobileNumber", "status", "actions"];
  dataSource!: MatTableDataSource<UserData>;
  ROLE_DATA: roleData[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imageSrc!: string;

  constructor(private fb: FormBuilder, private _adminaApiServices: AdminApiService) { }

  ngOnInit(): void {
    this.getData();
    this.roleData();
    this.initForm();
  }

  roleData() {
    this._adminaApiServices.getroles().subscribe(roles => {
      this.ROLE_DATA = roles;
      // this.dataSource = new MatTableDataSource(this.ROLE_DATA);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      status: ['false'],
      photo: ['']
    });
  }

  getData() {
    this._adminaApiServices.getUsers().subscribe(users => {
      this.USER_DATA = users;
      this.dataSource = new MatTableDataSource(this.USER_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onFileSelected(event: any) {
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.userForm.patchValue({
    //       photo: e.target?.result
    //     });
    //   };
    //   reader.readAsDataURL(file);
    // }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userForm.patchValue({
          photo: e.target?.result as string // Base64 string
        });
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  }

  getImageSrc(image: string) {
    return image ? image : this.defaultImage;
  }

  removeImage() {
    this.userForm.patchValue({
      photo: ''
    });
  }

  toggleStatus(element: UserData) {
    element.status = !element.status;
    this._adminaApiServices.updateUser(element._id, element).subscribe(response => {
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let payload: any = {
        name: this.userForm.value.name,
        role: this.userForm.value.role,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        mobileNumber: this.userForm.value.mobileNumber,
        status: this.userForm.value.status,
        photo: this.userForm.value.photo
      }


      if (this.userForm.value._id) {
        payload['_id'] = this.userForm.value._id
        this._adminaApiServices.updateUser(payload._id, payload).subscribe(
          Response => {
            this.getData()
            this.userForm.reset(),
              this.isUserForm = false,
              this.isUserTable = true
          },
          error => {
            console.error('Error updating role:', error);
          }
        )
      } else {


        this._adminaApiServices.createUser(payload).subscribe(
          response => {
            // this.USER_DATA.push(payload);
            this.getData();
            this.userForm.reset();
            this.isUserForm = false;
            this.isUserTable = true;
          },
          error => {
            console.error('Error creating user:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  editUser(element: any) {
    this.userForm.patchValue({
      _id: element._id,
      name: element.name,
      role: element.role,
      email: element.email,
      password: element.password,
      mobileNumber: element.mobileNumber,
      status: element.status,
      photo: element.photo
    });
    this.isUserForm = true;
    this.isUserTable = false;
  }

  deleteUser(element: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this._adminaApiServices.deleteUser(element).subscribe({
        next: () => {
          this.getData();
        },
        error: (err) => {
          console.error('Error deleting role:', err);
        },
      })
    }
  }


  addNewUser() {
    this.isUserForm = true;
    this.isUserTable = false;
  }

  onCancel() {
    this.isUserForm = false;
    this.isUserTable = true;
  }


}