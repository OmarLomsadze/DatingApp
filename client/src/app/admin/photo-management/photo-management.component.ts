import { Component, OnInit, TemplateRef } from '@angular/core';
import { Photo } from 'app/_models/photo';
import { AdminService } from 'app/_services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos!: Partial<Photo[]>;
  bsModalRef: BsModalRef;
  message!: string;

  constructor(private adminService: AdminService, private modalService: BsModalService) { 
  }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe(photos => {
        this.photos = photos;
    })
  }

  approvePhotoModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm'})
  }

  rejectPhotoModal(temp: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(temp, {class: 'modal-sm'})
  }

  confirm(photo: Photo): void {
    this.message = 'Confirmed!';
    this.bsModalRef.hide();
    
    if(this.message === 'Confirmed!') {
      this.adminService.approvePhoto(photo).subscribe(() => {
        this.photos = this.photos.filter(x => x.id != photo.id);
      });
    }
  }

  decline(photo: Photo): void {
    this.message = 'Declined';
    this.bsModalRef.hide();

    if(this.message === 'Declined') {
      this.adminService.rejectPhoto(photo).subscribe(() => {
        this.photos = this.photos.filter(x => x.id != photo.id);
      });
    }
  }
}
