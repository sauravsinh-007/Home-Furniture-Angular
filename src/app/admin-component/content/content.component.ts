import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminApiService } from 'src/app/services/admin-api.service';

export interface ContentData {
  _id: string,
  name: string,
  description: string,
  pageName: string,
  image: string
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  contentForm!: FormGroup
  isContentTable: boolean = true
  isContentForm: boolean = false
  defaultImage: string = '../../../assets/errorImage.jpg'


  CONTENT_DATA: ContentData[] = [
    {
      _id: '1',
      name: 'Homepage',
      description: 'Main landing page of the website',
      pageName: "1",
      image: 'path/to/image1.jpg'
    },
    {
      _id: '2',
      name: 'About Us',
      description: 'Page describing the company and its mission',
      pageName: "2",
      image: 'path/to/image2.jpg'
    }
  ]

  contentDisplayedColumns: string[] = ['name', 'description', 'pageNumber', 'image', 'actions'];
  contentDataSource!: MatTableDataSource<ContentData>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  imageSrc!: string

  constructor(private _frombuilder: FormBuilder, private _adminaApiServices: AdminApiService) { }

  ngOnInit() {
    this.initContentForm();
    this.getContentData();
  }


  initContentForm() {
    this.contentForm = this._frombuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      pageName: [''],
      image: ['']
    });
  }

  getContentData() {
    this._adminaApiServices.getContent().subscribe(content => {
      this.CONTENT_DATA = content;
      this.contentDataSource = new MatTableDataSource(this.CONTENT_DATA);
      this.contentDataSource.paginator = this.paginator;
      this.contentDataSource.sort = this.sort;
    });
  }


  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'image') {
          this.contentForm.patchValue({
            image: e.target?.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getImageSrc(image: string) {
    return image ? image : this.defaultImage;
  }

  removeImage() {
    this.contentForm.patchValue({
      image: ""
    })
  }



  onContentSubmit() {
    if (this.contentForm.valid) {
      const payload = this.contentForm.value;
      if (this.contentForm.value._id) {
        this._adminaApiServices.updateContent(payload._id, payload).subscribe(
          response => {
            this.getContentData();
            this.contentForm.reset();
            this.isContentForm = false;
            this.isContentTable = true;
          },
          error => {
            console.error('Error updating content:', error);
          }
        );
      } else {
        this._adminaApiServices.createContent(payload).subscribe(
          response => {
            this.getContentData();
            this.contentForm.reset();
            this.isContentForm = false;
            this.isContentTable = true;
          },
          error => {
            console.error('Error creating content:', error);
          }
        );
      }
    } else {
      console.log('Content form is invalid');
    }
  }

  onCancel() {
    this.isContentForm = false;
    this.isContentTable = true;
  }

  addNewContentPage() {
    this.isContentForm = true;
    this.isContentTable = false;
  }


  editContentPage(element: any) {
    this.contentForm.patchValue({
      _id: element._id,
      name: element.name,
      pageName: element.pageName,
      description: element.description,
      image: element.image
    });
    this.isContentForm = true;
    this.isContentTable = false;
  }


  deleteContentPage(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this._adminaApiServices.deleteContent(id).subscribe({
        next: () => {
          this.getContentData();
        },
        error: (err) => {
          console.error('Error deleting content:', err);
        }
      });
    }
  }
}
