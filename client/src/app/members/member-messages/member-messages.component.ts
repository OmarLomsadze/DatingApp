import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'app/_models/message';
import { MembersService } from 'app/_services/members.service';
import { MessageService } from 'app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages!: Message[];
  @Input() username!: string;
  messageContent!: string;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(m => {
      this.messages.push(m);
      this.messageForm.reset();
    })
  }

}
