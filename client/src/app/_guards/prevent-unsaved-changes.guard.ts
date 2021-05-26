import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MemberEditComponent } from 'app/members/member-edit/member-edit.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editForm.dirty) {
      return confirm('დარწმუნებული ხარ ბრატ? წაგეშლება');
    }
    return true;
  }
  
}
