import { Message } from "./message";

export class MessageParams {
    pageNumber = 1;
    pageSize = 10;
    container = 'Inbox';

    constructor(message: Message) { }
}