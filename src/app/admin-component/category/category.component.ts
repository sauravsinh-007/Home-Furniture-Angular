import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminApiService } from 'src/app/services/admin-api.service';


export interface categoryData {
  _id: string;
  name: string;
  parentCategory: string;
  description: string;
  image: string;
  status: boolean;

}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categoryForm!: FormGroup;
  isCategoryForm: boolean = false;
  isCategoryTable: boolean = true
  defaultImage: string = "../../../assets/user_img.jpg"

  CATEGORY_DATA: categoryData[] = [];
  parentCategoryOption: string[] = [];

  displayedColumns: string[] = ["image", "name", "parentCategory", "description", "status", "actions"]
  dataSource!: MatTableDataSource<categoryData>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _formBuilder: FormBuilder, private _adminApiService: AdminApiService) {

  }
  ngOnInit() {
    this.initForm();
    this.getData();
  }


  initForm() {
    this.categoryForm = this._formBuilder.group({
      _id: [''],
      name: ['', [Validators.required]],
      parentCategory: [''],
      description: [''],
      image: [''],
      status: [false]
    })
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
        this.categoryForm.patchValue({
          image: e.target?.result as string // Base64 string
        });
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  }

  getImageSrc(image: string) {
    return image ? image : this.defaultImage;
  }

  removeImage() {
    this.categoryForm.patchValue({
      image: ''
    });
  }

  toggleStatus(element: categoryData) {
    element.status = !element.status;
    this._adminApiService.updateCategory(element._id, element).subscribe(
      response => {
        console.log('Status updated successfully:', response);
      },
    );
  }

  getData() {
    this._adminApiService.getCategory().subscribe(categories => {
      this.CATEGORY_DATA = categories;
      this.dataSource = new MatTableDataSource(this.CATEGORY_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // filter the category data

      //   this.parentCategoryOption = this.CATEGORY_DATA
      //     .filter(category => !category.parentCategory || category.parentCategory === '')
      //     .map(category => category.name);
      // });

      // show the all parent data

      this.parentCategoryOption = this.CATEGORY_DATA.map(category => category.name);
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const payload: any = {
        name: this.categoryForm.value.name,
        parentCategory: this.categoryForm.value.parentCategory,
        image: this.categoryForm.value.image,
        description: this.categoryForm.value.description,
        status: this.categoryForm.value.status
      };

      if (this.categoryForm.value._id) {
        payload["_id"] = this.categoryForm.value._id;
        this._adminApiService.updateCategory(payload._id, payload).subscribe(
          response => {
            console.log('Category updated successfully:', response);
            this.getData();
            this.resetForm();
          },
          error => {
            console.error('Error updating category:', error);
          }
        );
      } else {
        this._adminApiService.createCategory(payload).subscribe(
          response => {
            console.log('Category created successfully:', response);
            this.getData();
            this.resetForm();
          },
          error => {
            console.error('Error creating category:', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }


  resetForm() {
    this.categoryForm.reset();
    this.isCategoryForm = false;
    this.isCategoryTable = true;
  }

  editCategory(element: categoryData) {
    this.categoryForm.patchValue({
      _id: element._id,
      name: element.name,
      parentCategory: element.parentCategory,
      image: element.image,
      description: element.description,
      status: element.status
    });

    this.isCategoryForm = true;
    this.isCategoryTable = false;
  }


  deleteCategory(element: categoryData) {
    if (confirm('Are you sure you want to delete this item?')) {
      this._adminApiService.deleteCategory(element._id).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.getData();
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        },
      });
    }
  }

  addNewCategory() {
    this.isCategoryForm = true;
    this.isCategoryTable = false;
  }

  onCancel() {
    this.isCategoryForm = false;
    this.isCategoryTable = true;
  }

}
