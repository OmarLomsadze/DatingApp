import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from 'app/_models/photo';
import { User } from 'app/_models/User';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  UpdateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  getPhotosForApproval() {
    return this.http.get<Partial<Photo[]>>(this.baseUrl + 'admin/photos-to-moderate', {});
  }

  approvePhoto(photo: Photo) {
    return this.http.post(this.baseUrl + 'admin/approve-photo/' + photo.id, {});
  }

  rejectPhoto(photo: Photo) {
    return this.http.post(this.baseUrl + 'admin/reject-photo/' + photo.id, {});
  }
}
