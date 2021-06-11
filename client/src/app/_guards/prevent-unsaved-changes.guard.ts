import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from 'app/members/member-edit/member-edit.component';
import { ConfirmService } from 'app/_services/confirm.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) { }

  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
    if(component.editForm.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }
  
}
