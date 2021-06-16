import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Member } from "app/_models/member";
import { MembersService } from "app/_services/members.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MemberDetailedResolver implements Resolve<Member> {
    id!: number;

    constructor(private memberService: MembersService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.memberService.getMember(Number(route.paramMap.get('id')));
    }
}