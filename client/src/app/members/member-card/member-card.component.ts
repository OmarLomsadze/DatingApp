import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'app/_models/member';
import { MembersService } from 'app/_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input()  member!: Member | undefined;

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member: Member | undefined) {
    this.memberService.addLike(member!.username).subscribe(() => {
      this.toastr.success("You Have Liked " + member?.knownAs);
    })
  }

}