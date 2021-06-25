
import { Component, OnInit } from '@angular/core';
import { Message } from 'app/_models/message';
import { MessageParams } from 'app/_models/messageParams';
import { Pagination } from 'app/_models/pagination';
import { MessageService } from 'app/_services/message.service';

@Component({
  selector: 'app-messages-private',
  templateUrl: './messages-private.component.html',
  styleUrls: ['./messages-private.component.css']
})
export class MessagesPrivateComponent implements OnInit {
  messages: Message[] = [];
  messengers: string[] = [];
  pagination!: Pagination;
  messageParams: MessageParams;
  loading = false;

  constructor(private messageService: MessageService ) {
    this.messageParams = this.messageService.getMessageParams();
  }

  ngOnInit(): void {
    this.loadMessengers();
  }

  loadMessengers() {
    this.messageService.setMessageParams(this.messageParams);

    this.messageService.getMessages(this.messageParams).subscribe(o => {
      this.messages = o.result;
      this.pagination = o.pagination;
      this.loading = false;
    });

    this.messages.forEach(o => {
      this.messengers.push(o.senderUsername);
    }) 
  }

  pageChanged(event: any) {
    this.messageParams.pageNumber = event.page;
    this.loadMessengers();
  }

}
