import { Component, OnInit } from '@angular/core';
import { Message } from 'app/_models/message';
import { Pagination } from 'app/_models/pagination';
import { MessageParams } from 'app/_models/messageParams';
import { ConfirmService } from 'app/_services/confirm.service';
import { MessageService } from 'app/_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination!: Pagination;
  messageParams: MessageParams;
  loading = false;

  constructor(private messageService: MessageService, private confirmService: ConfirmService) {
    this.messageParams = this.messageService.getMessageParams();
   }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.setMessageParams(this.messageParams);

    this.messageService.getMessages(this.messageParams).subscribe(o => {
      this.messages = o.result;
      this.pagination = o.pagination;
      this.loading = false;
    })
  }

  pageChanged(event: any) {
    this.messageParams.pageNumber = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.confirmService.confirm('Confirm Delete Message', 'This Cannot Be Undone').subscribe(result => {
      if (result) {
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        });
      }
    })
  }
}
