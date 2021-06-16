import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'app/_models/member';
import { User } from 'app/_models/User';
import { AccountService } from 'app/_services/account.service';
import { MembersService } from 'app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('editForm')  editForm!: NgForm;
  member!: Member;
  user!: User;

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.id).subscribe(member => {
      this.member = member;
    })
  }

  updateUsername(member: Member) {
    this.memberService.updateUsername(this.member).subscribe(() =>{
      this.toastr.success('Ez update');
      this.editForm.reset(this.member);
      this.user.id = member.id;
      this.accountService.setCurrentUser(this.user);
      this.member.id = member.id;
    })
  }

  omit_special_char(event: { charCode: number; })
  {   
    let k: number;  
    k = event.charCode;
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}
