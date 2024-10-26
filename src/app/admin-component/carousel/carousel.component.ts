import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminApiService } from 'src/app/services/admin-api.service';

export interface carouselData {
  _id: string;
  pageName: string;
  description: string;
  status: boolean;
  image: string;

}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  carouselForm!: FormGroup
  isCarouserTable: boolean = true
  isCarouserForm: boolean = false
  defaultImage: string = '../../../assets/errorImage.jpg'

  CAROUSEL_DATA: carouselData[] = [];

  carouseldisplayedColumns: string[] = ["pageName", "description", "status", "image", "actions"]
  carouseldataSource!: MatTableDataSource<carouselData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imageSrc!: string

  constructor(private _fromBuilder: FormBuilder, private _adminApiService: AdminApiService) {

  }

  ngOnInit(): void {
    this.initForm()
    this.getCarouselData()
  }

  initForm() {
    this.carouselForm = this._fromBuilder.group({
      _id: [''],
      pageName: ['', Validators.required],
      image: [''],
      description: ['', Validators.required],
      status: [false]
    });
  }

  getCarouselData() {
    this._adminApiService.getCarousel().subscribe(carousel => {
      this.CAROUSEL_DATA = carousel;
      this.carouseldataSource = new MatTableDataSource(this.CAROUSEL_DATA);
      this.carouseldataSource.paginator = this.paginator;
      this.carouseldataSource.sort = this.sort
    })
  }

  getImageSrc(image: string) {
    return image ? image : this.defaultImage;
  }

  addNewCarousel() {
    this.isCarouserForm = true;
    this.isCarouserTable = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.carouseldataSource.filter = filterValue.trim().toLowerCase();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.carouselForm.patchValue({
          image: e.target?.result as string // Base64 string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.carouselForm.patchValue({
      image: ''
    });
  }


  toggleStatus(element: carouselData) {
    element.status = !element.status;
    this._adminApiService.updateCarousel(element._id, element).subscribe(response => {
      console.log('Status updated successfully:', response);
    });
  }

  onSubmit() {

    if (this.carouselForm.valid) {
      // const payload = this.carouselForm.value
      let payload: any = {
        pageName: this.carouselForm.value.pageName,
        image: this.carouselForm.value.image,
        description: this.carouselForm.value.description,
        status: this.carouselForm.value.status
      }

      if (this, this.carouselForm.value._id) {
        payload._id = this.carouselForm.value._id
        this._adminApiService.updateCarousel(payload._id, payload).subscribe(
          Response => {
            this.getCarouselData();
            this.carouselForm.reset();
            this.isCarouserForm = false;
            this.isCarouserTable = true
          },
          error => {
            console.error('Error updating content:', error);
          }
        );

      } else {
        this._adminApiService.createCarousel(payload).subscribe(
          Response => {
            this.getCarouselData();
            this.carouselForm.reset();
            this.isCarouserForm = false;
            this.isCarouserTable = true
          },
          error => {
            console.error('Error creating content:', error);
          }
        );
      }
    } else {
      console.log('carousel form is invalid');
    }

  }

  onCancel() {
    this.isCarouserForm = false;
    this.isCarouserTable = true
  }

  editCarousel(element: any) {
    this.carouselForm.patchValue({
      _id: element._id,
      pageName: element.pageName,
      image: element.image,
      description: element.description,
      status: element.status
    })

    this.isCarouserForm = true;
    this.isCarouserTable = false
  }

  deleteCarousel(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this._adminApiService.deleteCarousel(id).subscribe({
        next: () => {
          this.getCarouselData();
        },
        error: (err) => {
          console.error('Error deleting content:', err);
        }
      });
    }
  }

}


